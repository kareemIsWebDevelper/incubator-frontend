import React from "react";
import OrganizationList from "./OrganizationList";
import { db } from "@/fake-db/pages/organization";
import OrganizationsPageHeader from "./OrganizationsPageHeader";

const Organizations = () => {
  return (
    <>
      <OrganizationsPageHeader
        totalCount={db.length}
        activeCount={db.filter((org) => org.status === 1).length}
        inactiveCount={db.filter((org) => org.status === 0).length}
      />
      <OrganizationList organizations={db} />
    </>
  );
};

export default Organizations;
