import './index.html';
import './index.scss';

// import * as R from 'ramda';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, /* RouteComponentProps, */ Switch } from 'react-router-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// import DATA from 'data.json';
import Topics from 'pages/topics';

injectTapEventPlugin();

const Home: React.StatelessComponent<{}> = () => (
    <div>
        <h2>Home</h2>
    </div>
);


const About: React.StatelessComponent<{}> = () => (
    <div>
        <h2>About</h2>
    </div>
);


/*
const Topic: React.StatelessComponent<RouteComponentProps<{}>> = ({ match }) => (
    <div>
        <h3>{R.prop('topicId', match.params)}</h3>
    </div>
);


const Topics: React.StatelessComponent<RouteComponentProps<{}>> = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>
        <Route
            path={`${match.url}/:topicId`}
            component={Topic}
        />
        <Route
            exact={true}
            path={match.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);
*/

const Login: React.StatelessComponent<{}> = () => (
    <FlatButton label="Login" />
);


const Menu: React.StatelessComponent<{}> = () => (
    <IconMenu
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
    </IconMenu>
);


class Layout extends React.Component<{}, {}> {

  public state = {
    logged: true,
    title: 'React-Typescript boulerplate'
  };

    // constructor( props ){
    //     super( props );
    // };

    // componentDidMount() {
    // }

    public render(): JSX.Element {
        return (
            <Router>
                <div>
                    <AppBar
                        title="Title"
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        iconElementRight={this.state.logged ? <Menu /> : <Login />}
                    />
                    <h1>{this.state.title}</h1>
                    <ul>
                        <li>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={'/about'}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to={'/topics'}>
                                Topics
                            </Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/" exact={true} component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/topics" component={Topics}/>
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
        );
    }
}


ReactDOM.render( <MuiThemeProvider><Layout /></MuiThemeProvider>, document.getElementById('layout'));