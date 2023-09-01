import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import './SearchBar.scss';
import { useState } from "react";

interface SearchBarProps {
  focusHighlight?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onSubmit?: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>();

  const setHighlighting = (value: boolean) => {
    if (props.focusHighlight) {
      setIsInputFocused(value);
    }
  }

  const classNames = "search-bar" + (props.className ? ` ${props.className}` : "");

  return (
    <div
      className={classNames}
      style={isInputFocused ? focusStyle : {}}>
      <Form className="search-input-container">
        <Form.Group controlId='search'>
          <Form.Control
            type='text'
            placeholder='Enter search here'
            className='search-input'
            onFocus={() => setHighlighting(true)}
            onBlur={() => setHighlighting(false)}
            onChange={(e) => setSearchQuery(e.target.value) }
             />
        </Form.Group>
      </Form>
      <FontAwesomeIcon
        icon={ faSearch }
        size="xl"
        className="search-icon"
        onClick={() => {
          if (props.onSubmit) {
            if (searchQuery) {
              props.onSubmit(searchQuery);
            }
          }
        }}/>
    </div>
  );
}

SearchBar.defaultProps = {
  focusHighlight: true
};

const focusStyle = {
  borderStyle: "solid",
  borderColor: "blue",
  boxShadow: "0 0 10px rgba(1.0, 0.0, 0.0, 1)"
};

export default SearchBar;
