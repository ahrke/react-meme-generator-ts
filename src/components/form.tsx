import * as React from 'react';

interface FormInterface {
  isMemeGenerated: boolean;
  textBottom: string;
  textTop: string;
  handleImageChange: () => void;
  handleImageInputChange: (event: React.ChangeEvent) => void;
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
          onChange={props.handleImageInputChange}
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
        <button
          className="btn btn-primary"
          type="button"
          onClick={props.handleImageChange}
        >
          Change Image
        </button>

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

        <button
          className="btn btn-primary"
          type="button"
          onClick={props.handleMemeGeneration}
        >
          Generate Meme
        </button>

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