import {css} from 'styled-components'

export default css`

&.container {
    display : flex;
    flex-direction: row;
    margin: 0 30px;

    div {
        flex: 1
    }

    div.body {
        flex: 3
    }
}
`