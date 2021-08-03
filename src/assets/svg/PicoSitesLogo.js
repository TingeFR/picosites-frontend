function PicoSitesLogo(props) {

  function handleClick(e){
    e.preventDefault();
    if(props.onClick){
      props.onClick();
    }
  }

  return (
    <div style={props.style} onClick={handleClick}>
      <svg viewBox="34.832 80.893 403.082 72.177" xmlns="http://www.w3.org/2000/svg">
        <path d="M 54.622 80.893 L 70.92 80.893 L 70.92 153.07 L 54.622 153.07 C 43.692 153.07 34.832 144.21 34.832 133.28 L 34.832 100.683 C 34.832 89.753 43.692 80.893 54.622 80.893 Z" style={{fill: "rgb(69, 39, 160)"}}/>
        <path d="M 97.091 81.477 C 107.535 81.477 116.002 89.944 116.002 100.388 L 116.002 102.233 C 116.002 112.677 107.535 121.144 97.091 121.144 L 83 121.144 L 83 81.477 Z" style={{fill: "rgb(105, 240, 174)"}}/>
        <path d="M 54.622 80.893 L 70.92 80.893 L 70.92 153.07 L 54.622 153.07 C 43.692 153.07 34.832 144.21 34.832 133.28 L 34.832 100.683 C 34.832 89.753 43.692 80.893 54.622 80.893 Z" style={{fill: "rgb(69, 39, 160)"}}/>
        <path d="M 97.091 81.477 C 107.535 81.477 116.002 89.944 116.002 100.388 L 116.002 102.233 C 116.002 112.677 107.535 121.144 97.091 121.144 L 83 121.144 L 83 81.477 Z" style={{fill: "rgb(105, 240, 174)"}}/>
        <path d="M 144.282 149.326 L 144.282 100.546 L 152.236 100.546 L 152.236 106.454 C 155.033 101.953 159.399 99.702 165.337 99.702 C 170.276 99.702 174.272 101.124 177.322 103.971 C 180.373 106.834 181.898 110.947 181.898 116.309 C 181.898 119.653 181.144 122.597 179.637 125.147 C 178.148 127.696 176.116 129.665 173.536 131.055 C 170.976 132.445 168.116 133.14 164.956 133.14 C 162.014 133.14 159.462 132.669 157.302 131.725 C 155.142 130.765 153.453 129.409 152.236 127.654 L 152.29 149.326 Z M 163.049 126.81 C 166.353 126.81 168.897 125.849 170.676 123.93 C 172.455 122.011 173.345 119.544 173.345 116.533 C 173.345 113.373 172.474 110.855 170.731 108.986 C 168.968 107.117 166.408 106.181 163.049 106.181 C 161.216 106.181 159.5 106.585 157.901 107.397 C 156.302 108.209 155.033 109.366 154.088 110.873 C 153.143 112.38 152.672 114.125 152.672 116.111 L 152.672 116.607 C 152.672 118.593 153.143 120.363 154.088 121.92 C 155.033 123.476 156.294 124.675 157.874 125.519 C 159.454 126.381 161.178 126.81 163.049 126.81 Z" style={{fill: "rgb(0, 0, 112)"}}/>
        <path d="M 424.022 133.14 C 421.587 133.14 419.065 132.85 416.45 132.271 C 413.816 131.693 411.945 131.005 410.839 130.211 L 413.59 124.302 C 416.641 126.256 420.116 127.232 424.022 127.232 C 427.945 127.232 429.906 126.189 429.906 124.104 C 429.906 123.178 429.497 122.458 428.68 121.944 C 427.863 121.43 426.408 120.827 424.322 120.132 L 421.435 119.164 C 418.384 118.054 415.968 116.724 414.189 115.167 C 412.408 113.611 411.52 111.56 411.52 109.011 C 411.52 106.099 412.781 103.822 415.306 102.184 C 417.812 100.528 421.179 99.701 425.411 99.701 C 427.481 99.701 429.524 99.907 431.54 100.322 C 433.556 100.751 435.089 101.29 436.143 101.936 L 433.174 107.918 C 432.521 107.305 431.466 106.784 430.015 106.354 C 428.56 105.907 426.945 105.684 425.166 105.684 C 421.552 105.684 419.746 106.677 419.746 108.663 C 419.746 109.788 420.236 110.642 421.217 111.22 C 422.178 111.798 423.75 112.436 425.929 113.131 C 426.128 113.164 426.918 113.412 428.299 113.876 C 431.548 115.035 433.964 116.359 435.544 117.848 C 437.124 119.338 437.914 121.242 437.914 123.558 C 437.914 126.703 436.606 129.086 433.991 130.707 C 431.357 132.328 428.034 133.14 424.022 133.14 Z" style={{fill: "rgb(0, 0, 112)"}}/>
        <path d="M 387.942 133.14 C 383.785 133.14 380.307 132.388 377.51 130.881 C 374.715 129.374 372.653 127.356 371.327 124.824 C 370.003 122.309 369.338 119.544 369.338 116.533 C 369.338 113.139 370.12 110.17 371.681 107.621 C 373.225 105.071 375.369 103.12 378.109 101.762 C 380.852 100.389 383.957 99.702 387.424 99.702 C 392.818 99.702 396.822 101.06 399.437 103.773 C 402.051 106.486 403.359 110.302 403.359 115.217 C 403.359 116.458 403.288 117.749 403.141 119.09 L 377.973 119.09 C 378.518 121.92 379.618 123.963 381.269 125.221 C 382.922 126.462 385.229 127.083 388.187 127.083 C 390.622 127.083 392.627 126.902 394.207 126.537 C 395.787 126.172 397.241 125.661 398.565 124.998 L 401.071 130.36 C 399.802 131.105 398.075 131.75 395.896 132.296 C 393.7 132.86 391.047 133.14 387.942 133.14 Z M 377.973 113.876 L 395.351 113.876 C 395.405 111.014 394.716 108.986 393.281 107.794 C 391.864 106.62 389.832 106.032 387.179 106.032 C 381.841 106.032 378.774 108.646 377.973 113.876 Z" style={{fill: "rgb(0, 0, 112)"}}/>
        <path d="M 348.303 132.445 L 348.303 106.652 L 342.12 106.652 L 342.12 100.545 L 348.303 100.545 L 348.303 87.537 L 356.61 85.874 L 356.61 100.545 L 364.7 100.545 L 364.7 106.652 L 356.61 106.652 L 356.61 132.445 L 348.303 132.445 Z" style={{fill: "rgb(0, 0, 112)"}}/>
        <path d="M 329.454 94.563 C 327.874 94.563 326.558 94.074 325.504 93.098 C 324.434 92.122 323.897 90.921 323.897 89.498 C 323.897 88.19 324.434 87.073 325.504 86.147 C 326.558 85.221 327.874 84.757 329.454 84.757 C 330.979 84.757 332.278 85.221 333.349 86.147 C 334.422 87.073 334.956 88.19 334.956 89.498 C 334.956 90.921 334.43 92.122 333.376 93.098 C 332.341 94.074 331.034 94.563 329.454 94.563 Z" style={{fill: "rgb(105, 240, 174)"}}/>
        <path d="M 325.259 132.445 L 325.259 100.545 L 333.812 100.545 L 333.812 132.445 L 325.259 132.445 Z" style={{fill: "rgb(0, 0, 112)"}}/>
        <path d="M 302.229 133.14 C 299.797 133.14 297.272 132.85 294.657 132.271 C 292.023 131.693 290.154 131.005 289.046 130.211 L 291.797 124.302 C 294.848 126.256 298.326 127.232 302.229 127.232 C 306.151 127.232 308.113 126.189 308.113 124.104 C 308.113 123.178 307.704 122.458 306.887 121.944 C 306.07 121.43 304.618 120.827 302.529 120.132 L 299.641 119.164 C 296.591 118.054 294.175 116.724 292.396 115.167 C 290.617 113.611 289.727 111.56 289.727 109.011 C 289.727 106.099 290.988 103.822 293.513 102.184 C 296.019 100.528 299.388 99.701 303.618 99.701 C 305.688 99.701 307.731 99.907 309.747 100.322 C 311.763 100.751 313.296 101.29 314.35 101.936 L 311.381 107.918 C 310.727 107.305 309.673 106.784 308.222 106.354 C 306.77 105.907 305.152 105.684 303.373 105.684 C 299.759 105.684 297.953 106.677 297.953 108.663 C 297.953 109.788 298.443 110.642 299.424 111.22 C 300.385 111.798 301.957 112.436 304.136 113.131 C 304.335 113.164 305.125 113.412 306.506 113.876 C 309.755 115.035 312.171 116.359 313.751 117.848 C 315.331 119.338 316.121 121.242 316.121 123.558 C 316.121 126.703 314.813 129.086 312.198 130.707 C 309.564 132.328 306.241 133.14 302.229 133.14 Z" style={{fill: "rgb(0, 0, 112)"}}/>
        <path d="M 263.112 133.14 C 259.497 133.14 256.294 132.396 253.497 130.906 C 250.699 129.434 248.539 127.423 247.014 124.874 C 245.489 122.324 244.726 119.494 244.726 116.384 C 244.726 113.323 245.48 110.518 246.987 107.968 C 248.477 105.419 250.618 103.408 253.415 101.936 C 256.212 100.446 259.443 99.702 263.112 99.702 C 266.781 99.702 269.995 100.446 272.754 101.936 C 275.532 103.408 277.665 105.419 279.155 107.968 C 280.661 110.518 281.416 113.323 281.416 116.384 C 281.416 119.494 280.653 122.324 279.128 124.874 C 277.603 127.423 275.451 129.434 272.672 130.906 C 269.913 132.396 266.726 133.14 263.112 133.14 Z M 263.33 127.033 C 266.291 127.033 268.622 126.033 270.33 124.03 C 272.019 122.044 272.863 119.544 272.863 116.533 C 272.863 113.521 271.956 110.979 270.139 108.912 C 268.306 106.859 265.89 105.833 262.894 105.833 C 259.988 105.833 257.656 106.851 255.894 108.887 C 254.15 110.922 253.279 113.472 253.279 116.533 C 253.279 119.494 254.213 121.987 256.084 124.005 C 257.972 126.023 260.388 127.033 263.33 127.033 Z" style={{fill: "rgb(0, 0, 112)"}}/>
        <path d="M 227.575 133.14 C 224.123 133.14 221.01 132.452 218.232 131.08 C 215.454 129.722 213.255 127.753 211.64 125.171 C 210.006 122.607 209.189 119.586 209.189 116.11 C 209.189 112.816 209.94 109.929 211.449 107.447 C 212.937 104.982 215.045 103.07 217.769 101.712 C 220.493 100.372 223.633 99.701 227.193 99.701 C 229.879 99.701 232.205 100.017 234.166 100.645 C 236.127 101.273 237.669 102.052 238.797 102.978 L 235.12 109.011 C 232.995 107.074 230.579 106.106 227.874 106.106 C 224.622 106.106 222.143 107.007 220.438 108.812 C 218.73 110.617 217.878 113.025 217.878 116.036 C 217.878 119.462 218.758 122.125 220.52 124.029 C 222.279 125.933 224.731 126.884 227.874 126.884 C 229.454 126.884 230.996 126.678 232.505 126.264 C 233.992 125.849 235.147 125.362 235.964 124.799 L 238.933 130.087 C 237.824 130.864 236.264 131.569 234.248 132.197 C 232.232 132.825 230.007 133.14 227.575 133.14 Z" style={{fill: "rgb(0, 0, 112)"}}/>
        <path d="M 195.461 94.563 C 193.881 94.563 192.565 94.074 191.511 93.098 C 190.441 92.122 189.904 90.921 189.904 89.498 C 189.904 88.19 190.441 87.073 191.511 86.147 C 192.565 85.221 193.881 84.757 195.461 84.757 C 196.986 84.757 198.285 85.221 199.356 86.147 C 200.426 87.073 200.963 88.19 200.963 89.498 C 200.963 90.921 200.437 92.122 199.383 93.098 C 198.348 94.074 197.04 94.563 195.461 94.563 Z" style={{fill: "rgb(69, 39, 160)"}}/>
        <path d="M 191.266 132.445 L 191.266 100.545 L 199.819 100.545 L 199.819 132.445 L 191.266 132.445 Z" style={{fill: "rgb(0, 0, 112)"}}/>
      </svg>
    </div>
  );
}

export default PicoSitesLogo;