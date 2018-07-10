import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './index.module.scss'

class Selector extends React.Component {
  static propTypes = {
    select: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.array,
  }

  handleSelect = (e) => {
    const { name } = e.currentTarget.dataset
    this.props.onChange(name);
  }

  render() {
    const { options, select } = this.props;

    const width = options.length * 193;

    return (
      <div className={styles.selectorWrapper}>
        <div className={styles.selectorPanel}>
          <ul className={styles.selector} style={{ width }}>
            {
              options.map(option => (
                <li 
                  key={option.name} 
                  className={classnames({
                    [styles.select]: option.name === select
                  })}
                  data-name={option.name}
                  onClick={this.handleSelect}
                >
                  <img src={option.value} alt=""/>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Selector
