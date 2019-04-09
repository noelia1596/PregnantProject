import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons'
import './imagenes.css';
import styles from './styles.module.css';

export default props => 
  <div className='buttons fadein'>
    
    <div className={styles.upload_btn_wrapper} >
      <label htmlFor='single'>
        <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />
      </label>
      <input type='file' id='single' onChange={(e) => props.onChange(e)} /> 
    </div>

    <div className='button'>
      <label htmlFor='multi'>
        <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' />
      </label>
      <input type='file' id='multi' onChange={props.onChange} multiple />
    </div>

  </div>
