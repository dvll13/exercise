import React, {Component} from 'react';

// doesn't start with capital letter because it doesn't qualify as a component since it returns a function, not JSX
const withClass = (WrappedComponent, className) => {
    
    // return (props) => (
    //     <div className={className}>
    //         <WrappedComponent {...props} /> {/*just return the component here, avoid manipulations*/}
    //     </div>
    // )

    //can return a stateful component also:
    return class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }
}

export default withClass;