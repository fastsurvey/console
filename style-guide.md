## Styleguide

Only use functional React components. Structure them like this:

```typescript
interface Props {
    ...
}
function name(props: Props) {
    return (...)
}
```

<br/>

Separate functionality and presentation into different components. Example:

-   `control-strip.tsx` (functional)
-   `visual-strip.tsx` (presentational)
-   `visual-draft-strip.tsx` (presentational)
-   `visual-published-strip.tsx` (presentational)
-   `visual-button.tsx` (presentational)

<br/>

Use the `validators` and `hints` instead of, Example:

```typescript
const regexIsValid = validators.regex;
const hintIsValid = validators.hint;
```

... instead of ...

```typescript
const regexIsValid = (regex: string) => regex.length <= 250;
const hintIsValid = (hint: string) => hint.length <= 120;
```

By that all validators and hints are in one place and uniform.

<br/>

Use higher order `dispatchers` in the redux-connector. Example

```typescript
const mapStateToProps = (state: stateTypes.ReduxState) => ({
    ...
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: dispatchers.openMessage(dispatch),
    closeAllMessages: dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Component);
```

This is the cleanest variant I've found so far.

<br/>

Sort imports by (not that important):

1. libraries
2. utilities/constants
3. assets
4. standard components
5. relative components

<br/>
