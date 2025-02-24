import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Collapse,
  createTheme,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  ThemeProvider,
  Toolbar,
  Typography,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AddCircleOutlineOutlined,
  SubjectOutlined
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: '50px'
    }
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: '35px'
        },
        input: {
          height: '0px',
          fontSize: '0.9em'
        }
      }
    }
  }
});

const drawerWidth = 240;
const secAppbarHeight = 64;

const ToolbarOffest = styled('div', { name: 'ToolbarOffest' })(
  ({ theme }) => ({
    ...theme.mixins.toolbar,
    backgroundColor: 'inherit'
  })
);

const AppBar2 = styled('div', { name: 'AppBar2' })(({ theme }) => ({
  display: 'flex',
  minHeight: secAppbarHeight,
  alignItems: 'center',
  paddingRight: '1.2rem'
}));

interface MainContentProps {
  drawerOpen: boolean;
}

interface Layout2Props {
  children: React.ReactNode;
  isLoggedIn: boolean; // اضافه کردن پراپرتی isLoggedIn
}

const MainContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'drawerOpen',
  name: 'MainContent'
})<MainContentProps>(({ theme, drawerOpen, ...props }) => ({
  zIndex: '3',
  width: '100%',
  marginRight: -drawerWidth,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(drawerOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }),
}));

const PageContent = styled('div', { name: 'PageContent' })(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: 'fit-content'
  })
);

export function Layout2({ children, isLoggedIn }: Layout2Props) { // اضافه کردن پراپرتی isLoggedIn
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [drawListOpen, setDrawListOpen] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawList = (event: React.SyntheticEvent, id: number) =>
    setDrawListOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.reload();
    // setIsLoggedIn(false); // حذف این خط چون ما قبلاً وضعیت ورود را از پراپرتی دریافت می‌کنیم
  };

  const menuItems = [
    {
      text: 'اشخاص',
      id: 3,
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: false,
      sublists: [
        {
          text: 'شخص جدید',
          icon: <SubjectOutlined color="secondary" />,
          path: '/newperson'
        },
        {
          text: 'مشاهده اشخاص',
          icon: <SubjectOutlined color="secondary" />,
          path: '/viewperson'
        }
      ]
    },
    {
      text: '',
      id: 4,
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: false,
      sublists: [
        {
          text: ' ',
          icon: <SubjectOutlined color="secondary" />,
          path: '/'
        },
        {
          text: ' ',
          icon: <SubjectOutlined color="secondary" />,
          path: '/'
        }
      ]
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          height: '100%'
        }}
        component="div">
        {/* First Appbar */}
        <AppBar
          elevation={0}
          sx={{
            '&.MuiAppBar-root': {
              backgroundColor: '#304967',
              zIndex: '4'
            }
          }}>
          <Toolbar>
            <Typography sx={{ display: 'inline-block', margin: 1 }}>
              هنرستان جوار نفت
            </Typography>
            <IconButton
              sx={{ marginLeft: 'auto' }}
              color="inherit"
              aria-label="drawerOpen drawer"
              onClick={handleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ display: 'inline-block', margin: 0 }}>
              admin
            </Typography>
            <Avatar sx={{ bgcolor: 'inherit', mr: 0 }}>
              {/* لوگوی شخص */}
            </Avatar>
            {isLoggedIn && (
              <IconButton
                sx={{ marginRight: '0.2rem' }}
                color="inherit"
                aria-label="logout"
                onClick={handleLogout}>
                <Typography sx={{ display: 'inline-block', color: 'inherit', margin: 1 }}>
                  خروج
                </Typography>
                <LogoutIcon />
              </IconButton>
            )}

          </Toolbar>
        </AppBar>

        <MainContent drawerOpen={drawerOpen}>
          {/* محتوای صفحه */}
          <ToolbarOffest />

          {/* Second Appbar */}
          <AppBar2 sx={{ position: 'sticky', background: '#bbc6d4' }}>
            <IconButton color="primary" onClick={handleDrawerClose}>
              <ArrowForwardIcon sx={{ ml: '1rem', fontSize: '1.2rem' }} />
            </IconButton>
            <Typography sx={{ fontSize: '1.2rem' }}> </Typography>
          </AppBar2>

          {/* اطلاعات صفحه */}
          <PageContent>{children}</PageContent>
        </MainContent>

        {/* Drawer */}
        <Drawer
          variant="persistent"
          anchor="right"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth },
            zIndex: 2
          }}
          open={drawerOpen}>
          <ToolbarOffest />
          <List
            component="nav"
            sx={{
              '& .MuiListItemButton-root': {
                textAlign: 'right'
              }
            }}>
            <ListItemButton
              onClick={() => navigate('/')}
              sx={{
                ...(router.pathname == '/' && {
                  backgroundColor: '#CFCFCF'
                })
              }}>
              <ListItemIcon sx={{ minWidth: '32px' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="داشبورد" />
            </ListItemButton>
            {/* نشان دادن List */}
            {menuItems.map((item) => (
              <>
                <ListItemButton
                  key={item.text}
                  onClick={(event) => handleDrawList(event, item.id)}>
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${item.text}`} />
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    {item.sublists && (drawListOpen[item.id] ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemIcon>
                </ListItemButton>
                {/* نشان دادن SubList */}
                <Collapse in={drawListOpen[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.sublists.map((sublist) => (
                      <>
                        <ListItemButton
                          onClick={() => navigate(sublist.path)}
                          sx={{
                            pr: 6,
                            ...(router.pathname === sublist.path && {
                              backgroundColor: '#CFCFCF'
                            })
                          }}>
                          <ListItemIcon sx={{ minWidth: '32px' }}>
                            <CircleIcon sx={{ fontSize: '1rem' }} />
                          </ListItemIcon>
                          <ListItemText primary={sublist.text} />
                        </ListItemButton>
                      </>
                    ))}
                  </List>
                </Collapse>
              </>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

export default Layout2;
