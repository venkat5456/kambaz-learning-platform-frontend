"use client";

import dynamic from "next/dynamic";

export default function DetailsTab({ cid, qid }: any) {
  const DetailsTabContent = dynamic(() => import("./DetailsTabContent"), {
    ssr: false,
  });

  return <DetailsTabContent cid={cid} qid={qid} />;
}

