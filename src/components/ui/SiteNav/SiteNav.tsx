"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import styles from "./siteNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";

interface Props {
  setConfigActive: any;
}

function SiteNav({ setConfigActive }: Props) {
  return (
    <NavigationMenu.Root className={styles.navigationMenuRoot}>
      <NavigationMenu.List className={styles.navigationMenuList}>
        <NavigationMenu.Item>Productively</NavigationMenu.Item>
        <NavigationMenu.Item className={styles.navigationMenuItem}>
          <button
            name="Settings"
            onClick={() => setConfigActive((prev: boolean) => !prev)}
          >
            <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
          </button>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}

export default SiteNav;
