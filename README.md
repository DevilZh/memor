# memoComponentCreator
create memo component with react &amp; context

## description

If your React Application Working with the `Context API`, it could help you to create React.memo component quickly, which is better way to avoid unnecessary render.

## usage

``` typescript

// App.tsx
import { createContext, useState } from 'react'
import { createMemoComponent } from 'memoComponentCreator'
import Layout from './components/Layout'

interface State {
  foo: string
  bar: number
  baz: boolean
}
export const Context = createContext({} as State)
export const connect = createMemoComponent<IState>(Context)

export const App = () => {
  const [ initialState, setState ] = useState()
  return <>
    <Context.Provider value={initialState}>
      <Layout incomingProp="hah" />
    </Context.Provider>
  </>
}

```

then, in the children Component:


```typescript
// Layout.tsx
import { FC } from 'react'
import { ConnectedProps } from 'memoComponentCreator'
import { connect } from "../App"

const connector = connect(state => ({
  foo: state.foo
}))

const Layout: FC<ConnectedProps<typeof connector> & {
  incomingProp: string
}> = (props) => {
  return (
    <div>
      <p>supProp: {props.incomingProp}</p>
      <p>contextProp: {props.foo}</p>
    </div>
  )
}

export default connector(Layout)

```
Layout component would rerender only state.foo in Context changed or incomingProp changed.