export default function Home() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-orange-100 to-green-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold text-gray-900">
              Welcome to AnTCV
            </h1>
            <p className="mt-4 text-xl text-gray-700">
              Your go-to AI Tool for Image Labelling and Training. We offer advanced features for Classification, Detection, and Segmentation.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Our Features
            </h2>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4">
                <span className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Classification
                  </h3>
                  <p className="text-gray-600">
                    Categorize images into predefined classes quickly and accurately.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <span className="bg-green-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Detection
                  </h3>
                  <p className="text-gray-600">
                    Detect and label objects within images with high precision.
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <span className="bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Segmentation
                  </h3>
                  <p className="text-gray-600">
                    Perform pixel-level labelling for precise image segmentation.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-8 text-center">
            <a
              href="#"
              className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    );
  }