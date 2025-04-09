import React, { useEffect, useState } from "react";
import { db } from "../../authconfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const GalleryUploads = () => {
  const navigate = useNavigate();
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ["Friends", "Family", "Travel", "Events", "Work"];

  const fetchMedia = async () => {
    try {
      const mediaRef = collection(db, "uploads");
      const snapshot = await getDocs(mediaRef);
      const fetchedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setMedia(fetchedData);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCategoryClick = (category) => {
    const filtered = media.filter((item) => item.category === category);
    setFilteredMedia(filtered);
    setCurrentCategory(category);
    setShowModal(true);
  };

  const handleMediaClick = (item, index) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % filteredMedia.length;
    setSelectedMedia(filteredMedia[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setSelectedMedia(filteredMedia[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const handleDelete = async () => {
    if (!selectedMedia) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this media?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "uploads", selectedMedia.id));
      setSelectedMedia(null);
      fetchMedia();
      setShowModal(false);
      alert("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="back-arrow" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
        ↩
      </div>
      <h2 className="text-center">My Gallery</h2>
      <h2 className="text-center mb-4">Select an Album</h2>

      <div className="row">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="col-md-3 mb-4"
            onClick={() => handleCategoryClick(cat)}
            style={{ cursor: "pointer" }}
          >
            <div className="card p-3 text-center shadow">
              <h5>{cat}</h5>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentCategory} Uploads</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {filteredMedia.length === 0 ? (
                    <p>No uploads in this category.</p>
                  ) : (
                    filteredMedia.map((item, index) => (
                      <div className="col-md-4 mb-4" key={item.id}>
                        <div
                          className="card"
                          onClick={() => handleMediaClick(item, index)}
                          style={{ cursor: "pointer" }}
                        >
                          {item.url?.endsWith(".mp4") ? (
                            <video src={item.url} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                          ) : (
                            <img src={item.url} alt="Uploaded" className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMedia && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body text-center position-relative p-0">
                <button
                  onClick={goPrev}
                  className="btn btn-light position-absolute start-0 top-50 translate-middle-y"
                  style={{ zIndex: 1000 }}
                >
                  ◀
                </button>

                {selectedMedia.url?.endsWith(".mp4") ? (
                  <video src={selectedMedia.url} controls autoPlay className="img-fluid" />
                ) : (
                  <img src={selectedMedia.url} alt="Selected Media" className="img-fluid" />
                )}

                <button
                  onClick={goNext}
                  className="btn btn-light position-absolute end-0 top-50 translate-middle-y"
                  style={{ zIndex: 1000 }}
                >
                  ▶
                </button>

                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-2"
                  onClick={() => setSelectedMedia(null)}
                ></button>

                <button
                  onClick={handleDelete}
                  className="btn btn-danger position-absolute bottom-0 start-50 translate-middle-x mb-3"
                  style={{ zIndex: 1000 }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryUploads;
