import React, { Suspense } from 'react'

import { getFormStats } from '@/actions/form-actions';
import { Separator } from '@/components/ui/separator';
import CreateFormButton from '@/components/create-form-button';
import StatsCardList from './_components/stats-card-list';
import FormCardList from './_components/form-card-list';
import FormCard from './_components/form-card';

const CardStatsWrapper = async () => {

  const stats = await getFormStats();

  return (
    <div>
      <StatsCardList
        data={stats}
        loading={false}
      />
    </div>
  );
}

const DashboardHomePage = () => {
  return (
    <div
      className="container pt-4"
    >
      <Suspense
        fallback={(
          <StatsCardList
            loading={true}
          />
        )}
      >
        <CardStatsWrapper />
      </Suspense>
      <Separator
        className="my-8"
      />
      <h2
        className="text-4xl font-bold col-span-2"
      >
        Your forms
      </h2>
      <Separator
        className="my-8"
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCard.Skeleton
              key={el}
            />
          ))}
        >
          <FormCardList />
        </Suspense>
      </div>
    </div>
  )
}

export default DashboardHomePage;