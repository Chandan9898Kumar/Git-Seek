import { MagnifyingGlass } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./search.module.css";

const Search = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState<string>("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    event.target.setCustomValidity("");
    setInputText(event.target.value);
  };

  const handleInvalidUser = (event: InvalidEvent<HTMLInputElement>): void => {
    event.target.setCustomValidity("This field is required !");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!inputText.trim()) {
      return;
    }
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = formData.get("username");
    navigate(`/${value}`);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.searchInfo}>
        <span aria-hidden="true">
          <MagnifyingGlass size={24} />
        </span>

        <input
          type="text"
          name="username"
          placeholder="Search Users ..."
          required
          value={inputText}
          onChange={handleSearch}
          onInvalid={handleInvalidUser}
          spellCheck={false}
          aria-required="true"
          autoComplete="off"
        />
      </div>

      <button type="submit">Search</button>
    </form>
  );
};

export default memo(Search);
