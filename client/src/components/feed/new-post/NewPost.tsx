import React from 'react'
import classes from './NewPost.module.css'
import Header from '../../header/Header'
import {
  FormControl,
  Textarea,
  Button,
  SimpleGrid,
  Image,
  Progress,
} from '@chakra-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { NewPostProps } from '../../../containers/new-post/NewPostContainer'

const NewPost: React.FC<NewPostProps & RouteComponentProps> = ({
  form,
  history,
  updateForm,
  addPost,
}) => {
  const [loading, setLoading] = React.useState(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect((): any => () => updateForm({ text: '', img: '' }), [])

  const handleImgChange = async (e: any) => {
    setLoading(true)

    const [img] = e.target.files
    const formData = new FormData()
    formData.append('photo', img)

    const response = await fetch(
      `http://localhost:5000/api/upload/singleImage?token=${JSON.parse(
        sessionStorage.getItem('accessToken')!,
      )}`,
      {
        method: 'POST',
        body: formData,
      },
    )

    const result = await response.json()

    updateForm({ ...form, img: result.data })

    setLoading(false)
  }

  return (
    <div className={classes.newPost}>
      <Header title="New Post" link />
      <form
        className={classes.form}
        onSubmit={e => {
          e.preventDefault()
          addPost()
          history.push('/feed')
        }}
      >
        <SimpleGrid columns={1} spacing="1rem">
          {loading && <Progress hasStripe isAnimated value={100} />}
          {form.img && <Image src={form.img} />}
          <FormControl>
            <Textarea
              defaultValue={form.text}
              name="text"
              placeholder="Write new post here..."
              resize="none"
              height="200px"
              onChange={(e: any) =>
                updateForm({ ...form, text: e.target.value })
              }
            />
          </FormControl>
          <div className={classes.buttons}>
            <div>
              <label className={classes.imgBtn} htmlFor="new-post-img">
                Choose image
              </label>
              <input
                onChange={handleImgChange}
                className={classes.imgInput}
                id="new-post-img"
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
              />
            </div>
            <Button type="submit" variantColor="blue" isDisabled={!form.valid}>
              Add Post
            </Button>
          </div>
        </SimpleGrid>
      </form>
    </div>
  )
}

export default withRouter(NewPost)
