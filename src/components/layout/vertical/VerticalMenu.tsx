// Next Imports
import { useParams } from "next/navigation";

// MUI Imports
import { useTheme } from "@mui/material/styles";

// Third-party Imports
import PerfectScrollbar from "react-perfect-scrollbar";

// Type Imports
import type { getDictionary } from "@/utils/getDictionary";
import type { VerticalMenuContextProps } from "@menu/components/vertical-menu/Menu";

// Component Imports
import { Menu, MenuItem, SubMenu } from "@menu/vertical-menu";

// Hook Imports
import useVerticalNav from "@menu/hooks/useVerticalNav";

// Styled Component Imports
import StyledVerticalNavExpandIcon from "@menu/styles/vertical/StyledVerticalNavExpandIcon";

// Style Imports
import menuItemStyles from "@core/styles/vertical/menuItemStyles";
import menuSectionStyles from "@core/styles/vertical/menuSectionStyles";

// Local Imports
import { getMenuItems } from "./menuItems";

type RenderExpandIconProps = {
  open?: boolean;
  transitionDuration?: VerticalMenuContextProps["transitionDuration"];
};

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void;
};

// Define types for menu structure
type SubMenuItem = {
  label: string;
  href: string;
};

type MenuItemType = {
  label: string;
  icon: string;
  href?: string;
  disabled?: boolean;
  children?: SubMenuItem[];
};

const RenderExpandIcon = ({
  open,
  transitionDuration,
}: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon
    open={open}
    transitionDuration={transitionDuration}
  >
    <i className="tabler-chevron-right" />
  </StyledVerticalNavExpandIcon>
);

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme();
  const verticalNavOptions = useVerticalNav();
  const params = useParams();

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions;
  const { lang: locale } = params;

  // Menu items configuration
  const menuItems: MenuItemType[] = getMenuItems(locale);

  // Function to render menu items
  const renderMenuItem = (item: MenuItemType) => {
    // If menu item has children, render as SubMenu
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu 
          key={item.label}
          label={item.label} 
          icon={<i className={item.icon} />}
        >
          {item.children.map(child => (
            <MenuItem key={child.label} href={child.href}>
              {child.label}
            </MenuItem>
          ))}
        </SubMenu>
      );
    }
    
    // Otherwise render as MenuItem
    return (
      <MenuItem
        key={item.label}
        href={item.href}
        icon={<i className={item.icon} />}
        disabled={item.disabled}
      >
        {item.label}
      </MenuItem>
    );
  };

  const ScrollWrapper = isBreakpointReached ? "div" : PerfectScrollbar;

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: "bs-full overflow-y-auto overflow-x-hidden",
            onScroll: (container) => scrollMenu(container, false),
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: (container) => scrollMenu(container, true),
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => (
          <RenderExpandIcon
            open={open}
            transitionDuration={transitionDuration}
          />
        )}
        renderExpandedMenuItemIcon={{
          icon: <i className="tabler-circle text-xs" />,
        }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {/* <SubMenu label={dictionary['navigation'].menuLevels}>
          <MenuItem>{dictionary['navigation'].menuLevel2}</MenuItem>
          <SubMenu label={dictionary['navigation'].menuLevel2}>
            <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
            <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
          </SubMenu>
        </SubMenu>
        <MenuItem disabled>{dictionary['navigation'].disabledMenu}</MenuItem> */}
        
        {menuItems.map(renderMenuItem)}
      </Menu>
    </ScrollWrapper>
  );
};

export default VerticalMenu;
