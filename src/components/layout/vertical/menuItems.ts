// Define types for menu structure
type SubMenuItem = {
  label: string;
  href: string;
};

// Define types for menu structure
type MenuItemType = {
  label: string;
  icon: string;
  href?: string;
  disabled?: boolean;
  children?: SubMenuItem[];
};

export const getMenuItems = (locale: string | string[]): Array<MenuItemType> => {
    // Menu items configuration
  const menuItems: Array<MenuItemType> = [
    {
      label: "Dashboard",
      icon: "tabler-smart-home",
      href: `/${locale}/dashboard`
    },
    {
      label: "Profile",
      icon: "tabler-user",
      href: `/${locale}/user-profile`
    },
    {
      label: "Startup / Idea",
      icon: "tabler-building-skyscraper",
      children: [
        { label: "Startup Profile", href: `/${locale}/startup/profile` },
        { label: "Analysis & Assessment", href: `/${locale}/startup/assessment` }
      ]
    },
    {
      label: "Calendar",
      icon: "tabler-calendar",
      href: `/${locale}/calendar`
    },
    {
      label: "Messages",
      icon: "tabler-message",
      href: `/${locale}/messages`
    },
    {
      label: "Mentors",
      icon: "tabler-users",
      href: `/${locale}/mentors`
    },
    {
      label: "Organizations",
      icon: "tabler-building",
      href: `/${locale}/organizations`
    },
    {
      label: "Programs",
      icon: "tabler-components",
      children: [
        { label: "Programs List", href: `/${locale}/programs` },
        { label: "Steps List", href: `/${locale}/programs/steps` },
        { label: "New Program", href: `/${locale}/programs/new` }
      ]
    },
    {
      label: "Projects",
      icon: "tabler-folder",
      href: `/${locale}/projects`
    },
    {
      label: "Mentorship Sessions",
      icon: "tabler-school",
      href: `/${locale}/mentorship-sessions`
    },
    {
      label: "Users & Startups",
      icon: "tabler-users-group",
      children: [
        { label: "Users", href: `/${locale}/users` },
        { label: "Startups", href: `/${locale}/startups` }
      ]
    },
    {
      label: "Roles & Permissions",
      icon: "tabler-lock",
      children: [
        { label: "Roles", href: `/${locale}/roles` },
        { label: "Permissions", href: `/${locale}/permissions` }
      ]
    },
    {
      label: "Forms",
      icon: "tabler-forms",
      children: [
        { label: "Form List", href: `/${locale}/forms` },
        { label: "Form Builder", href: `/${locale}/form-builder` },
        { label: "Submissions", href: `/${locale}/submissions` }
      ]
    },
    {
      label: "Training",
      icon: "tabler-book",
      children: [
        { label: "Dashboard", href: `/${locale}/training/dashboard` },
        { label: "Training Sessions", href: `/${locale}/training/sessions` },
        { label: "Training Courses", href: `/${locale}/training/courses` },
        // { label: "Training Result", href: `/${locale}/training/result` }
      ]
    },
    {
      label: "Services",
      icon: "tabler-device-gamepad-3",
      children: [
        { label: "Service List", href: `/${locale}/services` },
        { label: "Service Requests", href: `/${locale}/services/requests` },
        { label: "Service Categories", href: `/${locale}/services/categories` }
      ]
    },
    {
      label: "Manage Screenings",
      icon: "tabler-hourglass",
      href: `/${locale}/manage-screenings`
    },
    {
      label: "Final Screening",
      icon: "tabler-trophy",
      href: `/${locale}/final-screening`
    },
    {
      label: "Screening",
      icon: "tabler-gavel",
      href: `/${locale}/screening`
    },
    {
      label: "Quizzes & Surveys",
      icon: "tabler-clipboard-check",
      children: [
        { label: "Quizzes", href: `/${locale}/quizzes` },
        { label: "Surveys", href: `/${locale}/surveys` },
        { label: "Surveys Results", href: `/${locale}/surveys/results` },
      ]
    },
    {
      label: "Assessments",
      icon: "tabler-circle-dashed-check",
      href: `/${locale}/assessments`
    },
    {
      label: "Questions Management",
      icon: "tabler-help-octagon",
      children: [
        { label: "Questions", href: `/${locale}/questions` },
        { label: "Categories", href: `/${locale}/questions/categories` },
        { label: "Weights", href: `/${locale}/questions/weights` }
      ]
    },
    {
      label: "Documentations",
      icon: "tabler-file-analytics",
      href: `/${locale}/documentations`
    },
    {
      label: "Settings",
      icon: "tabler-settings",
      href: `/${locale}/settings`
    }
  ];

  return menuItems;
}