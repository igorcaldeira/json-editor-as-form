import React, { Component } from 'react';
import './App.css';
import Dropzone from 'react-dropzone'
import { Formik } from 'formik'
import CustomField from './form/CustomField'

class FileDropzone extends Component {

  onDrop = (acceptedFiles, rejectedFiles) => this.props.readFile(acceptedFiles[0])

  render() {
   return <Dropzone onDrop={this.onDrop}>
      {({getRootProps, getInputProps, isDragActive}) => {
        return (
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'dropzone--isActive' : ''}` }
          >
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop files here...</p> :
                <p>Try dropping some files here, or click to select files to upload.</p>
            }
          </div>
        )
      }}
    </Dropzone>
 }
}

const FormJson = props => {
  const renderer = (subname, obj, iteration, setFieldValue, parentName) => {
    const localInputName = (iteration === 0) ? subname : parentName+'.'+subname

    console.log('render -> ', localInputName)

    if(typeof obj == 'string'){
      return <div>
        <CustomField 
          type='text'
          name={ localInputName }
          setFieldValue={ setFieldValue }
          label={ subname }
          error={ [] }
          placeholder={ subname } 
          value={ obj } />
      </div>
    }else if(Array.isArray(obj)){

      return <div className='array-group'> {(iteration === 0 || iteration === 1) ? <div>
        <h2>{subname}</h2>
      </div> : (iteration === 2) ? <h4>{subname}</h4> : <p>{subname}</p>}

      {obj.map((nameField, index) => <div key={localInputName+'-'+index}>
          {renderer('['+index+']', obj[index], iteration + 1, setFieldValue, localInputName)}
        </div>)
      }</div>

    }else if(typeof obj == 'object'){
      
      return <div> {(iteration === 0 || iteration === 1) ? <div>
        <h2>{subname}</h2>
      </div> : (iteration === 2) ? <h3>{subname}</h3> : <p>{subname}</p>}

      {Object.keys(obj).map(nameField => <div>
          {renderer(nameField, obj[nameField], iteration + 1, setFieldValue, localInputName)}
        </div>)
      }</div>
    }else
      return <div>error</div>
  }

  const InputForm = localProps => renderer('Form', localProps.initialValues, -1, localProps.setFieldValue, '')

  return <div>
    <Formik initialValues={props.initialValues}
      onSubmit={(values, { setSubmitting }) => {
        props.submitFinish(JSON.stringify(values))
        setSubmitting()
      }} >
      {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <InputForm initialValues={props.initialValues} setFieldValue={setFieldValue} />
          <button className='default-btn' type='submit' disabled={isSubmitting}>Download new file</button>
          <button className='reload-btn'onClick={ () => window.location.reload()}>New file</button>
          <h1>Data Preview (JSON)</h1>
          <br />
          <div className='data-preview'>
            {JSON.stringify(values)}
          </div>
          <br /><br /><br />
        </form>
      )}
    </Formik>
  </div>
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: false,
      jsonContent: {}
    }
  }

  readFile = file => {
    var success = content => this.setState({
      name: file.name,
      jsonContent: JSON.parse(content)
    })
    var fileReader = new FileReader()
    fileReader.onload = evt => success( evt.target.result )
    fileReader.readAsText( file )
  }

  submitFinish = text => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', this.state.name);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  render() {
    return (
      <div className="App">
        <h1>Online JSON Editor</h1>
        <br />
        {Object.keys(this.state.jsonContent).length > 0 ? <FormJson
          submitFinish={this.submitFinish}
          initialValues={this.state.jsonContent}
        /> : <FileDropzone readFile={this.readFile} />}
      </div>
    );
  }
}

export default App;
