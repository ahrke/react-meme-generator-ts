import * as React from 'react';

interface FormInterface {
  isMemeGenerated: boolean;
  textBottom: string;
  textTop: string;
  handleImageChange: () => void;
  handleImageInputChange: (event: React.ChangeEvent) => void;
  handleInputChange: (event: React.ChangeEvent) => void;
  handleMemeGeneration: () => void;
  handleMemeReset: () => void;
}

const Form = (props: FormInterface) => {
  return (
    <div className="form">
      <div className="form_inputs">
        <input
          name="text-top"
          placeholder="Text Top"
          type="text"
          value={props.textTop}
          onChange={props.handleInputChange}
        />

        <input
          name="text-bottom"
          placeholder="Text bottom"
          type="text"
          value={props.textBottom}
          onChange={props.handleInputChange}
        />
      </div>

      <div className="form_btns">
        <label
          className="btn btn-primary"
          onClick={props.handleImageChange}
        >
          Change Image
        </label>

        <label
          className="btn btn-primary"
          htmlFor="fileInput"
        >
          Load Image
          <input 
            id="fileInput" 
            name="fileInput" 
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={props.handleImageInputChange}
            hidden
          />
        </label>

        <label
          className="btn btn-primary"
          onClick={props.handleMemeGeneration}
        >
          Generate Meme
        </label>

        {props.isMemeGenerated && 
          <button
            className="btn btn-danger"
            type="button"
            onClick={props.handleMemeReset}
          >
            Reset
          </button>
        }
      </div>
    </div>
  )
}

export default Form;