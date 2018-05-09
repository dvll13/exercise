import React from 'react';
import classes from './Cockpit.css';
import Person from '../Persons/Person/Person';

const Cockpit = (props) => {
    let assignedClasses = [],
        btnClasses = `${classes.button} ${classes.Red}`;
    if (props.persons.length <= 1) {
        assignedClasses.push(classes.red);
    }
    if (props.persons.length === 0) {
        assignedClasses.push(classes.bold);
    }

    return (
        <React.Fragment>
            <h1 className='unscopedClsTest'>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}>Sub-header text</p>

            {/* CONDITIONALS v1: */}
            <div className={classes.hidden}>
                <button className={btnClasses} onClick={props.clickedPersonsToggle}>Toggle persons (old)</button>
                {
                    props.showPersons ?
                        <div>
                            {/*bind - recommended than () => ... from below*/}
                            <button onClick={props.clickedSwitchName.bind(this, 'NewName1')}>Change name</button>

                            <Person
                                name={props.persons[1].name}
                                gender={props.persons[1].gender}
                                age={props.persons[1].age}
                                // clicked - custom attr used to pass reference to a parent method to be later called from Person; the other components should not have direct access to the State, but call only methods defined in the States' container
                                // () => ... - this is not recommended, use bind instead
                                clicked={() => props.clickedSwitchName('NewName2')}
                                changed={(event) => props.changedName(event, props.persons[1].id)}>
                                <i>{/*passing structured html:*/} My hobbies:</i> racing
                            </Person>
                        </div>
                        :
                        null
                }
            </div>

            {/* CONDITIONALS v2 (preferred): */}
            <button
                // style={btnShowMorePersonsStyle}
                className={classes.absBtn}
                onClick={props.clickedMorePersonsToggle}>
                Toggle persons 2 (cleaner, with variable + list)
            </button>
            <button onClick={props.login}>Log in</button>
        </React.Fragment>
    );
};

export default Cockpit;