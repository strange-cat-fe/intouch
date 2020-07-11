import { connect } from 'react-redux'
import NewPost from '../../components/feed/new-post/NewPost'
import { UpdateFormAction } from '../../types/feed'
import { AppState } from '../../store'
import { updateForm, addPost } from '../../actions/feed'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

interface LinkStateToProps {
  form: {
    text: string
    img: string
    valid: boolean
  }
}

interface LinkDispatchToProps {
  updateForm: (form: { text: string; img: string }) => UpdateFormAction
  addPost: () => ThunkAction<void, AppState, unknown, Action<string>>
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
  return {
    form: state.feed.form,
  }
}

const mapDispatchToProps: LinkDispatchToProps = {
  updateForm,
  addPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost as any)
