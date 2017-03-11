import * as UserActions from '../../../actions/user';
import Projects from './Projects';
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

class ToggleProjects extends Component {
  constructor() {
    super();

    this.state = {
      expanded: '',
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle(projectId, e) {
    const { checked } = e.target;
    this.props.dispatch(UserActions.toggleProject({
      add: checked,
      projectId,
    }));
  }

  render() {
    const userProjects = this.props.userProjects || [];
    const projects = this.props.projects.map(project => {
      return {
        ...project,
        selected: userProjects.indexOf(project.id) > -1,
      };
    });
    const className = classnames('dropdown', { 
      'open': this.state.expanded,
    });

    return (
      <span className={className}>
        <button 
          className="btn btn-default dropdown-toggle"
          type="button"
          onClick={e => this.setState({ expanded: !this.state.expanded})}
        >
          Toggle Projects {' '}
          <span className="caret"></span>
        </button>
        <div 
          className="dropdown-menu"
          style={{ width: '700px' }}
        >
          <Projects 
            projects={projects} 
            toggle={this.toggle}
          />
        </div>
      </span>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  userProjects: state.user.projects,
});
export default connect(mapStateToProps)(ToggleProjects);
