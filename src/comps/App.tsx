import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import {
  getCollegesRequest,
  clearSearchResult
} from "../sagas/actions/colleges";
import Map from "./Map";
import "./App.css";

const useDebounce = (value, timeout = 1000) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);
    return () => clearTimeout(handler);
  }, [value, timeout]);
  return state;
};

const App = (props) => {
  const { getCollegesRequest, clearSearchResult, colleges } = props;
  const [input, setInput] = useState("");
  const [college, setCollege] = useState("");
  const [listPage, setListPage] = useState(0);
  const [collegeList, setCollegeList] = useState([]);

  let debouncedSearchTerm = useDebounce(input, 1000);
  let ref = useRef(null);

  // The scroll listener
  const handleScroll = useCallback(() => {
    const { scrollHeight, clientHeight, scrollTop } = ref?.current;
    const isScrollToBottom =
      Math.ceil(clientHeight + scrollTop + 15) > scrollHeight;
    if (isScrollToBottom && debouncedSearchTerm) {
      // Query for next page of colleges from API
      getCollegesRequest(debouncedSearchTerm, colleges.metadata.page + 1);
    }
    // get new callback when state/prop changed
  }, [debouncedSearchTerm, colleges.metadata.page]);

  // Effect to get colleges API or clear search result
  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      getCollegesRequest(debouncedSearchTerm, listPage);
    } else {
      clearSearchResult();
      setListPage(0);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const { metadata, results } = colleges;
    setListPage(metadata.page);
    setCollegeList(
      results.sort((a, b) => a["school.name"].localeCompare(b["school.name"]))
    );
  }, [colleges.results]);

  return (
    <article className="app-container">
      <section className="search-field">
        <label className="search-input-label" htmlFor="search-input">
          Find Colleges ({collegeList.length} / {colleges?.metadata?.total})
        </label>
        <input
          width={Math.floor(window.innerWidth / 3)}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Search by ..."
          type="search"
          name="search-input"
          id="search-input"
        />
        <div className="colleges-list" ref={ref} onScroll={handleScroll}>
          {collegeList?.map((clg, idx) => {
            const name = clg["school.name"];
            return (
              <p
                key={idx + name}
                className={(college === name ? "active" : "") + " list-item"}
                onClick={() => setCollege(name)}
              >
                {name}
              </p>
            );
          })}
        </div>
      </section>
      <Map
        address={college || input}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </article>
  );
};

// export default App;
export default connect(({ colleges }) => ({ colleges }), {
  getCollegesRequest,
  clearSearchResult
})(App);
