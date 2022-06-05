import * as React from 'react';
import { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Modal from '@mui/material/Modal';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { HiColorSwatch, HiQuestionMarkCircle, HiGlobeAlt, HiPencil, HiMail, HiOutlineNewspaper } from "react-icons/hi";
import { GoMarkGithub } from "react-icons/go";
import { GooglePicker } from 'react-color';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const drawerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'transparent',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const handleOpenToolbox = () => {
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="position absolute h-full w-full flex justify-center items-center z-40">
            <Box>
                <GooglePicker
                    color={currentColor}
                    onChange={(colorD) => sendCurrentColor(colorD)}
                />
            </Box>
        </Modal>
        )
}

export default function PersistentDrawerLeft(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState()
    const [openModal, setOpenModal] = React.useState(false);

    const sendCurrentColor = (color) => {
        setCurrentColor(color.hex)
        props.passColor(currentColor)
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleModalOpen = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Toolbox
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <h1>Toolbox</h1>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Color Picker', 'Pencil Size', 'Find Game', 'FAQ'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                {index === 0 &&
                                    <ListItemIcon>
                                        <HiColorSwatch />
                                    </ListItemIcon>
                                }
                                {index === 1 &&
                                    <ListItemIcon>
                                        <HiPencil />
                                    </ListItemIcon>}
                                {index === 2 &&
                                    <ListItemIcon>
                                        <HiGlobeAlt />
                                    </ListItemIcon>
                                }
                                {index === 3 &&
                                    <ListItemIcon>
                                        <HiQuestionMarkCircle />
                                    </ListItemIcon>
                                }
                                {text === 'Color Picker' &&
                                    <ListItemText
                                    primary={text}
                                    onClick={handleModalOpen}/>
                                }
                                {text === 'Pencil Size' &&
                                    <ListItemText primary={text}/>
                                }
                                {text === 'Find Game' &&
                                    <ListItemText primary={text}/>}
                                {text === 'FAQ' &&
                                    <ListItemText primary={text}/>}

                                { openModal &&
                                    handleOpenToolbox()
                                }
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Contact Me', 'Resume', 'Github'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index === 0 && <HiMail />}
                                    {index === 1 && <HiOutlineNewspaper />}
                                    {index === 2 && <GoMarkGithub />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
