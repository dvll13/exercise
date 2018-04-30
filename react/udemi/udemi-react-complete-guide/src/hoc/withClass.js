import React, {Component} from 'react';

// doesn't start with a capital letter because it doesn't qualify as a component since it returns a function, not JSX
const withClass = (WrappedComponent, className) => {
    
    // return (props) => (
    //     <div className={className}>
    //         <WrappedComponent {...props} /> {/*just return the component here, avoid manipulations*/}
    //     </div>
    // )

    //can return a stateful component also:
    // return class extends Component {
    //     render() {
    //         return (
    //             <div className={className}>
    //                 <WrappedComponent {...this.props} />
    //             </div>
    //         )
    //     }
    // }

    // in order to be able to forward refs:
    const WithClass = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} ref={this.props.forwardedRef} />
                </div>
            )
        }
    };
    return React.forwardRef((props, ref) => {
        return <WithClass {...props} forwardedRef={ref} />
    });
};

export default withClass;