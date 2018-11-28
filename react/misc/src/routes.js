import {funcAsChildren, Lazy, Memo, StaticContextType} from './examples/'

export default [
    {
        title: 'Functions as children',
        path: '/func-as-children',
        component: funcAsChildren
    },
    {
        title: 'React.lazy()',
        path: '/lazy',
        component: Lazy
    },
    {
        title: 'React.memo()',
        path: '/memo',
        component: Memo
    },
    {
        title: 'Static context type',
        path: '/static-context-type',
        component: StaticContextType
    }
]
