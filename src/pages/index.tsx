import './index.html';
import './index.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { indigo500, indigo700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

// import DATA from 'data.json';
import Menu from 'components/menu';
import SignIn from 'components/signin';
import About from 'pages/about';
import Home from 'pages/about';
import Topics from 'pages/topics';
import { User, Users } from 'pages/users';

const THEME = {
    ...lightBaseTheme,
    palette: {
        ...lightBaseTheme.palette,
        pickerHeaderColor: indigo500,
        primary1Color: indigo500,
        primary2Color: indigo700
    }
};

injectTapEventPlugin();


class Layout extends React.Component<{}, {}> {

    public state = {
        drawer: false,
        logged: true,
        title: 'React-Typescript boulerplate'
    };

    public toggleDrawer() {
        this.setState({ drawer: !this.state.drawer });
    }

    constructor( props: React.Props<{}> ) {
        super( props );
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    // componentDidMount() {
    // }

    public render(): JSX.Element {
        return (
            !this.state.logged
            ? <SignIn />
            : (
                <Router>
                    <div>
                        <AppBar
                            title={this.state.title}
                            iconElementRight={
                                <Menu />
                            }
                            onLeftIconButtonTouchTap={ this.toggleDrawer }
                        />
                        <Drawer
                            docked={false}
                            open={this.state.drawer}
                            onRequestChange={ this.toggleDrawer }
                        >
                            <AppBar
                                iconElementLeft={<span />}
                                iconElementRight={<IconButton><NavigationMenu /></IconButton>}
                                onRightIconButtonTouchTap={ this.toggleDrawer }
                            />
                            <NavLink to={'/'} exact={true} ><MenuItem>Home</MenuItem></NavLink>
                            <NavLink to={'/about'}><MenuItem>About</MenuItem></NavLink>
                            <NavLink to={'/topics'}><MenuItem>Topics</MenuItem></NavLink>
                            <NavLink to={'/users'}><MenuItem>Users</MenuItem></NavLink>
                        </Drawer>

                        <Route
                            path="/users/:id"
                            render={
                                ({ match: {params} , history }) => (
                                    <User
                                        data={{ id: params.id }}
                                        onClose={
                                            () => history.push('/users')
                                        }
                                    />
                                )
                            }
                        />

                        <Switch>
                            <Route path="/" exact={true} component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/topics" component={Topics}/>
                            <Route path="/users" component={Users}/>
                            <Route
                                path="*"
                                render={
                                    ({ location: {} }): React.ReactNode => (
                                        <h3>404: {location.pathname}</h3>
                                    )
                                }
                            />
                        </Switch>
                    </div>
                </Router>
            )
        );
    }
}


ReactDOM.render(
    <MuiThemeProvider
        muiTheme={getMuiTheme(THEME)}
    >
        <Layout />
    </MuiThemeProvider>,
    document.getElementById('layout')
);
