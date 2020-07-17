import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../store'
import { Action } from 'redux'
import { logOut } from '../../actions/auth'
import { connect, ConnectedProps } from 'react-redux'
import Settings from '../../components/settings/Settings'

interface LinkStateToProps {
  theme: 'light' | 'dark'
}

interface LinkDispatchToProps {
  logOut: () => ThunkAction<void, AppState, unknown, Action<string>>
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
  return {
    theme: state.auth.user!.theme,
  }
}

const mapDispatchToProps: LinkDispatchToProps = {
  logOut,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type SettingsProps = ConnectedProps<typeof connector>

export default connector(Settings)
