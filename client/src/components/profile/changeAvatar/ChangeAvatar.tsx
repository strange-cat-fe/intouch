import React, { ChangeEvent, useState, MouseEvent } from 'react'
import classes from './ChangeAvatar.module.css'
import {
  Progress,
  Image,
  FormControl,
  Textarea,
  SimpleGrid,
  Button,
} from '@chakra-ui/core'
import Header from '../../header/Header'
import { RouteComponentProps } from 'react-router-dom'

const ChangeAvatar: React.FC<RouteComponentProps> = ({ history }) => {
  const [img, setImg] = useState('')

  const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const img = (e.target as HTMLInputElement).files!
    const formData = new FormData()
    formData.append('photo', img[0])

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

    setImg(result.data)
  }

  const handleClick = async (event: MouseEvent) => {
    event.preventDefault()
    await fetch(
      `http://localhost:5000/api/profile/changeAvatar?token=${JSON.parse(
        sessionStorage.getItem('accessToken')!,
      )}`,
      {
        method: 'POST',
        body: JSON.stringify({ img }),
        headers: {
          'content-type': 'application/json',
        },
      },
    )
    history.push('/profile')
  }

  return (
    <div>
      <Header title="Change Avatar" link />
      <form>
        <SimpleGrid columns={1} spacing="1rem">
          {img && <Image src={img} />}
          <div className={classes.container}>
            <div>
              <label className={classes.imgBtn} htmlFor="new-post-img">
                Choose image
              </label>
              <input
                className={classes.input}
                id="new-post-img"
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={handleImgChange}
              />
            </div>
            <Button type="submit" variantColor="blue" onClick={handleClick}>
              Change avatar
            </Button>
          </div>
        </SimpleGrid>
      </form>
    </div>
  )
}

export default ChangeAvatar
