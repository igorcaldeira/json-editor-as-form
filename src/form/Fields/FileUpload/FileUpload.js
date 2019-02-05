import React, { Component } from 'react'

import './FileUpload.scss'
import { I18n } from 'react-i18next'

class FileUpload extends Component {

  constructor (props) {
    super(props)

    let preview = {}
    let file = {}

    this.state = {
      preview: preview,
      file: file,
      status: 'untouched',
      sourceId: false,
      defaultDefined: false
    }
  }

  componentDidMount () {
    var uploadFile = this
    this.refs.fakeInput.addEventListener('click', function () {
      uploadFile.refs.fileUpload.click()
    }, true)
  }

  componentWillReceiveProps (nextProps) {
    this.trySetDefault(nextProps)
  }

  askUpload = (event) => {
    event.preventDefault()
    this.refs.fileUpload.click()
  }

  resetComponent = (event) => {
    event.preventDefault()

    let preview = {}
    let file = {}

    this.setState({
      preview: preview,
      file: file,
      status: 'untouched',
      sourceId: false,
      defaultDefined: false
    })
  }

  trySetDefault = (props) => {
    if (!this.state.defaultDefined && props.default && Object.keys(props.default).length !== 0) this.setState({
      preview: props.default,
      file: {},
      status: 'default',
      sourceId: props.default.id,
      defaultDefined: true
    })
  }

  readUrl = (event) => {
    event.preventDefault()
    const { name, setFieldValue, onChangeCallback } = this.props
    var input = event.target
    var fileUploadSelf = this

    if (input.files && input.files[0]) {
      const file = input.files[0]
      const hasCallback = onChangeCallback && typeof onChangeCallback === 'function'

      if (setFieldValue) setFieldValue(name, file)

      if (hasCallback) onChangeCallback(file)

      var reader = new FileReader()
          reader.onload = function (e) {
            fileUploadSelf.setState({
              fileName: file.name,
              preview: e.target.result,
              file,
              status: 'touched'
            })
          }

      reader.readAsDataURL(file)
    }
  }

  thumbnailStyle = () => ({})

  placeholder = () => <I18n>{t => { return Object.keys(this.state.preview).length === 0 ? <div className='mt-5'>
    {this.props.editExibition ? <p style={{ color: 'black' }}>{t('components.change-file-upload')}</p> : t('components.file-upload') }
  </div> : <div className='mt-5' style={{ color: 'black' }}>
    { this.state.fileName }
  </div>
  }}</I18n>

  render () {
    return <div className='file-upload-component'>
      <input id='file-upload' ref='fileUpload' type='file' onChange={ this.readUrl } />
      <a id='fake-input' ref='fakeInput' className='fake-input' style={ this.thumbnailStyle() }>{ this.placeholder() }</a>
    </div>
  }
}

export default FileUpload
