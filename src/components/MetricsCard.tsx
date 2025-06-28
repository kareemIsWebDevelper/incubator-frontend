"use client";

// MUI Imports
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import type { CardProps } from "@mui/material/Card";

// Third-party Imports
import classnames from "classnames";

// Types Imports
import type { ThemeColor } from "@core/types";

//Component Imports
import CustomAvatar from "@core/components/mui/Avatar";

type Props = CardProps & {
  color: ThemeColor;
};

const Card = styled(MuiCard)<Props>(({ color }) => ({
  transition:
    "border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, margin 0.3s ease-in-out",
  borderBottomWidth: "2px",
  borderBottomColor: `var(--mui-palette-${color}-darkerOpacity)`,
  '[data-skin="bordered"] &:hover': {
    boxShadow: "none",
  },
  "&:hover": {
    borderBottomWidth: "3px",
    borderBottomColor: `var(--mui-palette-${color}-main) !important`,
    boxShadow: "var(--mui-customShadows-lg)",
    marginBlockEnd: "-1px",
  },
}));

type MetricsCard = {
  title: string;
  subTitle?: string;
  stats: number | string;
  trendNumber?: number;
  avatarIcon: string;
  color?: ThemeColor;
};

const MetricsCard = (props: MetricsCard & { index: number }) => {
  // Props
  const { title, subTitle, stats, trendNumber, avatarIcon, color, index } =
    props;

  return (
    <Card color={color || "primary"}>
      <CardContent className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <CustomAvatar color={color} skin="light" variant="rounded">
            <i className={classnames(avatarIcon, "text-[28px]")} />
          </CustomAvatar>
          <Typography variant="h4">{stats}</Typography>
        </div>
        <div className="flex flex-col gap-1">
          <Typography>{title}</Typography>
          <div className="flex items-center gap-2">
            {trendNumber ? (
              <>
                <Typography
                  color="text.primary"
                  className="font-medium"
                >{`${trendNumber > 0 ? "+" : ""}${trendNumber} `}</Typography>
                <Typography variant="body2" color="text.disabled">
                  {"than last week"}
                </Typography>
              </>
            ) : subTitle ? (
              <Typography variant="body2" color="text.disabled">
                {subTitle}
              </Typography>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
