import useStyles from './style'
import React, { useEffect, useState } from 'react'
import useEditorModel, { EditMusic } from './model'
import clsx from 'clsx'
import {
  Checkbox,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip
} from '@material-ui/core'
import EditorView from './parts/editor'
import { Album, Bookmark, Save } from '@material-ui/icons'
import SaveDialog from './parts/SaveDialog'
import ParseNameDialog, { MatchResult } from './parts/ParseNameDialog'
import { matchName } from '../../utils/match'
import SearchAlbumDrawer from './parts/SearchAlbumDrawer'
import { useEditor } from './parts/editor/hook'
import SearchLyricDrawer from './parts/SearchLyricDrawer'
import { useSearchLyricDrawerController } from './parts/SearchLyricDrawer/hook'
import { updateMusicLyrics } from '../../api/music'

export interface EditPagePropsType {
    className?: string;
}
const EditPage = ({ className }: EditPagePropsType): React.ReactElement => {
  const classes = useStyles()
  const model = useEditorModel()
  const [matchString, setMatchString] = useState<string | undefined>()
  const [searchAlbumOpen, setSearchAlbumOpen] = useState(false)
  const editController = useEditor()
  const searchLyricController = useSearchLyricDrawerController()
  const [searchLyricOpen, setSearchLyricOpen] = useState(false)
  useEffect(() => {
    model.loadMusic()
  }, [])
  // const getData = (): ColData[] => {
  //   return model.musicList.filter(it => model.getEditMusic(it.id) !== undefined)
  //     .map(it => ({
  //       id: it.id,
  //       filename: it.filename,
  //       editMusic: model.getEditMusic(it.id)
  //     }))
  // }
  const onMatchString = () => {
    const editMusic = model.editEntityList.filter(it => it.isSelect)
    if (editMusic.length === 0) {
      return
    }
    const music = editMusic[0]
    setMatchString(music.getFileName())
  }
  const onMatchOk = (pattern: string) => {
    setMatchString(undefined)
    for (const editEntity of model.editEntityList.filter(it => it.isSelect)) {
      const result: MatchResult = matchName(editEntity.getFileName(), pattern)
      editEntity.setTitle(result.title)
      editEntity.setArtist(result.artist)
    }
    model.setEditEntity([...model.editEntityList])
  }
  const onApplyAlbum = (cover: string, name: string, artistName: string) => {
    editController.setAlbum(name)
    editController.addArtist(artistName)
    editController.setCoverFromUrl(cover)
    setSearchAlbumOpen(false)
  }
  const onEditorSearchLyricClick = (id: number, title: string) => {
    searchLyricController.setInputSearch(title)
    setSearchLyricOpen(true)
  }
  const onApplyLyric = async (lyric: string) => {
    const selectedEditEntity = model.getSelectedEditEntity()
    if (selectedEditEntity.length !== 1) {
      return
    }
    await updateMusicLyrics(selectedEditEntity[0].getId().toString(), lyric)
    setSearchLyricOpen(false)
  }
  return (
    <div className={clsx(className, classes.root)}>
      <SaveDialog/>
      <ParseNameDialog
        open={Boolean(matchString)}
        name={matchString ?? ''}
        onCancel={() => setMatchString(undefined)}
        onOk={onMatchOk}
      />
      <SearchAlbumDrawer
        isOpen={searchAlbumOpen}
        onCLose={() => setSearchAlbumOpen(false)}
        onApply={onApplyAlbum}
      />
      <SearchLyricDrawer isOpen={searchLyricOpen} onCLose={() => setSearchLyricOpen(false)} onApply={onApplyLyric}
        controller={searchLyricController}/>
      <div className={classes.toolbar}>
        <div className={classes.title}>
                    Editor
        </div>
        {
          model.getSelectedEditEntity().length > 0 &&
                        <>
                          <Tooltip title='match filename'>
                            <IconButton size='medium' onClick={onMatchString}>
                              <Bookmark/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='search album meta'>
                            <IconButton size='medium' onClick={() => setSearchAlbumOpen(true)}>
                              <Album/>
                            </IconButton>
                          </Tooltip>
                        </>

        }

        <Tooltip title='Save all changes'>
          <IconButton size='medium' onClick={() => model.saveAll()}>
            <Save/>
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.content}>
        <div className={classes.view}>
          <EditorView controller={editController} onSearchLyric={onEditorSearchLyricClick}/>
        </div>
        <div className={classes.list}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color='primary'
                    onChange={(e) => {
                      model.setEditEntity([...model.editEntityList.map(it => {
                        it.isSelect = e.target.checked
                        return it
                      })])
                    }}
                    checked={model.editEntityList.filter(it => it.isSelect).length === model.editEntityList.length}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Filename</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Album</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                model.editEntityList
                  .map(it => {
                    return (
                      <TableRow
                        key={it.getId()}
                      >
                        <TableCell>
                          <Checkbox
                            color='primary'
                            onChange={(e) => {
                              model.setEditEntity([...model.editEntityList.map(elm => {
                                if (it.getId() === elm.getId()) {
                                  elm.isSelect = e.target.checked
                                }
                                return elm
                              }
                              )])
                            }}
                            checked={it.isSelect}
                          />
                        </TableCell>
                        <TableCell>{it.getId()}</TableCell>
                        <TableCell>{it.original.filename}</TableCell>
                        <TableCell>{it.getTitle()}</TableCell>
                        <TableCell>{it.getArtists()?.map(artistName => (
                          <Chip key={artistName} label={artistName}/>))}</TableCell>
                        <TableCell>{it.getAlbum()}</TableCell>
                      </TableRow>
                    )
                  })
              }
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  )
}

export default EditPage
