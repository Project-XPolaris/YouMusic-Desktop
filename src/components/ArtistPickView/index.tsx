import React, { ReactElement, useEffect, useState } from 'react'
import { useDebounce } from 'ahooks'
import { Artist, fetchArtistList } from '../../api/artist'
import { ArtistPickController } from './hook'
import { Autocomplete, Chip, TextField } from '@material-ui/core'
import { Person } from '@material-ui/icons'

export interface ArtistPickViewPropsType {
    controller:ArtistPickController
    className?:string
}

const ArtistPickView = ({ className, controller }: ArtistPickViewPropsType):ReactElement => {
  const [input, setInput] = useState<string>()
  const searchKey = useDebounce(input, { wait: 500 })
  const [options, setOptions] = useState<Artist[] | undefined>()

  useEffect(() => {
    (async () => {
      if (searchKey && searchKey?.length < 2) {
        return
      }
      const response = await fetchArtistList({ search: searchKey, page: 1, pageSize: 20 })
      setOptions(response.data)
    })()
  }, [searchKey])
  return (
    <Autocomplete
      fullWidth
      className={className}
      multiple
      freeSolo
      onInputChange={(e, text) => setInput(text)}
      renderInput={(params) => (
        <TextField
          {...params}
          label='artists'
          placeholder='Artists'
        />
      )}
      value={controller.selected}
      defaultValue={controller.selected}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip color={'primary'} icon={<Person />} label={option} {...getTagProps({ index })} key={index} />
        ))
      }
      options={options?.map(it => it.name) ?? []}
      onChange={(e, v) => controller.setSelected(v)}
    />
  )
}

export default ArtistPickView
