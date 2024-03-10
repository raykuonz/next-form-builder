import React, { Suspense } from 'react'

import { getFormStats } from '@/lib/actions/form';
import { Separator } from '@/components/ui/separator';
import CreateFormButton from '@/components/create-form-button';
import StatsCardList from './_components/stats-card-list';

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
      <CreateFormButton />
    </div>
  )
}

export default DashboardHomePage;