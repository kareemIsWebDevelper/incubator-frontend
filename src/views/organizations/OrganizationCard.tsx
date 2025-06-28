import { CardContent, IconButton, Tooltip, Typography, Avatar, Badge } from '@mui/material'
import { Card } from "@mui/material";
import React from "react";

const OrganizationCard = ({ organization, handleMenuOpen }: { organization: any, handleMenuOpen: (e: React.MouseEvent<HTMLElement>, id: number) => void }) => {
  return (
    <Card key={organization.id} className="org-card">
      <CardContent>
        <div className="flex justify-between items-center">
          <Typography variant="h5" className="text-primary font-semibold">
            {organization.name}
          </Typography>
          <div className="flex items-center gap-2">
            {organization.user.email && (
              <Tooltip title="Send Email">
                <IconButton
                  component="a"
                  href={`mailto:${organization.user.email}`}
                  className="text-primary"
                >
                  <i className="tabler-mail text-xl" />
                </IconButton>
              </Tooltip>
            )}
            {organization.user.phone && (
              <Tooltip title="Call">
                <IconButton
                  component="a"
                  href={`tel:${organization.user.phone}`}
                  className="text-primary"
                >
                  <i className="tabler-phone text-xl" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>

        <div className="mt-3 relative flex justify-center items-center h-[150px] w-full border shadow-sm">
          <img
            src={
              "https://beta.growthlabs.app/orgnizations/technology-innovation-&-entrepreneurship-center-(tiec)-v2-1.webp"
            }
            // src={organization.image_url || '/images/logo-placeholder.png'}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/logo-placeholder.png";
            }}
            alt="Organization Image"
            className="rounded h-[120px] min-w-[200px] object-cover"
          />
          <div
            className={`absolute bottom-0 right-0 m-2 w-[15px] h-[15px] rounded-full shadow ${
              organization.status === 1 ? "bg-success" : "bg-warning"
            }`}
            title={organization.status === 1 ? "Active" : "Inactive"}
          />
        </div>

        <div className="mt-3 flex flex-col">
          <Typography className="mb-1">Startup</Typography>
          <div className="flex justify-center items-center rounded border p-2">
            <Avatar
              src={organization.user.img_url || "/images/placeholder.png"}
              className="h-[35px] w-[35px] border"
            />
            <Typography className="ml-3">{organization.user.name}</Typography>
          </div>
        </div>

        <div className="mt-3 flex justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-label-warning px-2">
              <i className="tabler-building-skyscraper text-xl" />
            </Badge>
            <Typography className="font-semibold">Startups</Typography>
            <Typography className="font-semibold bg-light rounded-full w-5 h-5 flex justify-center items-center">
              {organization.total_startups}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-label-info px-2 py-1">
              <i className="tabler-components text-xl" />
            </Badge>
            <Typography className="font-semibold">Cycles</Typography>
            <Typography className="font-semibold bg-light rounded-full w-5 h-5 flex justify-center items-center">
              {organization.cycles.length}
            </Typography>
          </div>
          <IconButton
            className="rounded-full shadow"
            onClick={(e) => handleMenuOpen(e, organization.id)}
          >
            <i className="tabler-dots-vertical text-xl" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
