"use server";

import { currentUser } from "@clerk/nextjs";

import prisma from '@/lib/prisma';
import { FormSchemaType, formSchema } from "@/schemas/form-schemas";

class ErrorUserNotFound extends Error {}

export const getFormStats = async () => {
  const user = await currentUser();

  if (!user) {
    throw new ErrorUserNotFound();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    }
  })

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  }
}

export const createForm = async (data: FormSchemaType) => {

  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Form not valid');
  }

  const user = await currentUser();

  if (!user) {
    throw new ErrorUserNotFound();
  }

  const newForm = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
    }
  });

  if (!newForm) {
    throw new Error('Something went wrong');
  }

  return newForm.id;

}

export const getForms = async () => {
  const user = await currentUser();

  if (!user) {
    throw new ErrorUserNotFound();
  }

  const userForms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return userForms;
}

export const getFormById = async (formId: number) => {
  const user = await currentUser();

  if (!user) {
    throw new ErrorUserNotFound();
  }

  const userForm = await prisma.form.findUnique({
    where: {
      id: formId,
      userId: user.id,
    }
  });

  if (!userForm) {
    throw new Error('Form not found');
  }

  return userForm;
}

export const getFormByPublicId = async (formPublicId: string) => {
  const form = await prisma.form.update({
    select: {
      name: true,
      description: true,
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      }
    },
    where: {
      shareUrl: formPublicId,
    }
  });

  if (!form) {
    throw new Error('Form not found');
  }

  return form;
}

export const updateFormContent = async (formId: number, jsonContent: string) => {

  const user = await currentUser();

  if (!user) {
    throw new ErrorUserNotFound();
  }

  return prisma.form.update({
    where: {
      id: formId,
      userId: user.id,
    },
    data: {
      content: jsonContent,
    }
  })
}

export const publishForm = async (formId: number) => {
  const user = await currentUser();

  if (!user) {
    throw new ErrorUserNotFound();
  }

  return prisma.form.update({
    where: {
      id: formId,
      userId: user.id,
    },
    data: {
      published: true,
    }
  })
}

export const submitForm = async (formPublicId: string, content: string) => {

  return prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      formSubmissions: {
        create: {
          content,
        }
      }
    },
    where: {
      shareUrl: formPublicId,
    }
  });
}