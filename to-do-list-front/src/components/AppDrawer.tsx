import React, {useState} from 'react';
import {
    Box, CssBaseline, CSSObject, Divider,
    IconButton, List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, styled, Theme,
    Typography,
} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
    ChevronLeft,
    FormatListBulleted,
    Groups,
    HelpOutline, Menu,
    SpaceDashboard
} from "@mui/icons-material";
import logo from '../logo.svg';
import TasksView from "../views/TasksView";

const drawerMenuOptions = [
    {
        tabIndex: 0,
        label: "Dashboard",
        icon: <SpaceDashboard/>,
    },
    {
        tabIndex: 1,
        label: "Tasks",
        icon: <FormatListBulleted/>,
    },
    {
        tabIndex: 2,
        label: "Groups",
        icon: <Groups/>,
    },
    {
        tabIndex: 3,
        label: "Help",
        icon: <HelpOutline/>,
    }
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

interface DrawerFooterProps extends MuiAppBarProps {
    open?: boolean;
}

const DrawerFooter = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})<DrawerFooterProps>(({ theme, open }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: open ? 'flex-end' : 'center',
    margin: '10px 0',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const AppDrawer = () => {

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
                <img style={{padding: "15px", maxHeight: "120px"}} src={logo} alt="logo" />
                <Divider />
                <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                    <List>
                        {drawerMenuOptions.map(({tabIndex, label, icon}) => (
                            <ListItem key={label} sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => setSelectedTabIndex(tabIndex)}
                                    color="primary"
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        backgroundColor: selectedTabIndex === tabIndex ? 'primary.main' : 'inherit',
                                        color: selectedTabIndex === tabIndex ? 'primary.contrastText' : 'inherit',
                                        '&:hover': {
                                            backgroundColor: selectedTabIndex === tabIndex ? 'primary.main' : 'inherit',
                                        },
                                        borderRadius: 2,
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        tabIndex={tabIndex}
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: selectedTabIndex === tabIndex ? 'primary.contrastText' : 'inherit',
                                        }}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <DrawerFooter open={open}>
                        <IconButton sx={{margin: "10px"}} onClick={open ? handleDrawerClose : handleDrawerOpen}>
                            {open ? <ChevronLeft /> : <Menu />}
                        </IconButton>
                    </DrawerFooter>
                </Box>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {selectedTabIndex === 0 && <Typography paragraph>Dashboard</Typography>}
                {selectedTabIndex === 1 && <TasksView />}
                {selectedTabIndex === 2 && <Typography paragraph>Groups</Typography>}
                {selectedTabIndex === 3 && <Typography paragraph>Help</Typography>}
            </Box>
        </Box>
    );
}

export default AppDrawer;