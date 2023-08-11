import axios from 'axios';
import { useCallback, useState } from 'react';
import { useEffect, useRef } from 'react';

const API_URL = 'https://api.unsplash.com/search/photos';
const imagesPerPage = 18;


const Photo = () => {
    const searchInput = useRef(null);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMsg, setErrorMsg] = useState("")

    const fetchImages = useCallback(async () => {
        try {
            if (searchInput.current.value) {
                setErrorMsg('')
                const { data } = await axios.get(`${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${imagesPerPage}&client_id=${import.meta.env.VITE_API_KEY}`);

                setImages(data.results);
                setTotalPages(data.total_pages);
                // clear();
                // console.log(data);
            }
        } catch (error) {
            setErrorMsg("Error fetching images. Try again later.")
        }
    }, [page]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const resetHandle = () => {
        setPage(1);
        fetchImages();
    }
    const searchPhoto = () => {
        resetHandle();
    };

    const searchWithEnter = (event) => {
        if (event.key === "Enter") {
            fetchImages();
        }
    }
    const handleSelection = (selection) => {
        searchInput.current.value = selection;
        resetHandle();
    };

    // const clear = ()=> {
    //     searchInput.current.value = "";
    // }

    console.log("page", page);

    return (
        <div className='Photo border border-2 shadow-lg rounded-2 bg-light p-2 my-4'>
            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
            <div className="search shadow-sm">
                <div className="search-box">
                    <div className="search-field">
                        <input
                            placeholder={`Enter search keyword...`}
                            className="input"
                            type="text"
                            ref={searchInput}
                            onKeyUp={searchWithEnter}
                        />
                        <div className="search-box-icon">
                            <button
                                onClick={searchPhoto}
                                className="button btn-icon-content">
                                <i className="search-icon">
                                    <svg xmlns="://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#fff"></path></svg>
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="filters my-4 d-flex gap-2 justify-content-center">
                <div className='btn btn-secondary' onClick={() => handleSelection("safari")}>Safari</div>
                <div className='btn btn-secondary' onClick={() => handleSelection("coding")}>Coding</div>
                <div className='btn btn-secondary' onClick={() => handleSelection("dark")}>Dark</div>
                <div className='btn btn-secondary' onClick={() => handleSelection("cars")}>Cars</div>
            </div>

            <div className="image_container">
                {
                    images.map(image => {
                        return (
                            <img
                                className='image'
                                key={image.id}
                                src={image.urls.small}
                                alt={image.alt_description}
                            />
                        )
                    })
                }
            </div>

            <div className="page-buttons d-flex gap-2 my-3">
                {page > 1 && (<button className='btn btn-success' onClick={() => setPage(page - 1)}>Previous</button>)}
                {page < totalPages && (<button className='btn btn-success' onClick={() => setPage(page + 1)}>Next</button>)}
            </div>
        </div>
    )
}

export default Photo;