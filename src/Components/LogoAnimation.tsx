import React from 'react';

interface LogoAnimationProps {
    fill: number;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({ fill }) => {
    return (
        <svg width="400" height="400" viewBox="0 0 460 769" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#grad)" fill-rule="evenodd" clip-rule="evenodd" d="M224.02 21.1431C248.503 20.5686 272.854 21.724 297.075 24.6094C306.273 27.805 315.639 30.5781 325.173 32.9285C338.328 39.4205 351.442 45.891 364.51 52.3398C367.613 54.9374 370.189 57.9414 372.237 61.3523C375.669 74.7597 378.947 88.1626 382.071 101.561C390.895 118.589 404.242 130.836 422.111 138.304C425.214 140.901 427.789 143.906 429.838 147.317C449.568 190.494 456.125 235.788 449.506 283.196C446.438 304.524 440.819 325.321 432.648 345.59C426.961 351.663 421.809 358.132 417.194 365.001C412.872 386.43 410.999 408.151 411.574 430.168C406.892 436.638 401.272 442.185 394.715 446.806C393.097 450.882 391.692 455.042 390.501 459.285C390.033 474.536 389.564 489.788 389.096 505.04C388.923 514.51 387.518 523.752 384.881 532.77C383.411 534.975 381.772 537.055 379.964 539.01C373.24 543.333 366.918 548.186 360.998 553.568C358.938 558.461 357.533 563.544 356.783 568.82C354.094 575.271 350.816 575.733 346.949 570.206C345.254 564.168 339.053 561.477 337 555.5C333.714 548.906 333.126 543.969 326.578 547.329C322.864 552.354 319.82 557.668 317.446 563.274C311.983 587.463 309.876 611.959 311.124 636.76C311.358 650.163 311.592 663.565 311.826 676.969C315.073 700.871 316.01 724.904 314.636 749.068C312.749 757.965 307.364 761.432 298.48 759.467C294.911 756.41 291.867 752.943 289.348 749.068C281 693.607 280.057 650.387 284 592.391C277.943 572.521 268.54 562.583 247.903 565.354C237.543 572.107 230.754 581.581 227.532 593.777C227.064 603.021 226.595 612.264 226.127 621.508C225.097 627.731 222.288 629.117 217.698 625.667C215.815 614.011 212.303 602.919 207.161 592.391C200.058 586.529 193.736 587.452 188.195 595.164C178.559 610.439 186 625.167 186 643.5C186 661.833 188.195 676.969 182.575 694.994C176.946 702.585 171.794 702.123 167.121 693.607C166.654 657.557 166.184 621.508 165.716 585.458C161.92 575.198 160.046 564.569 160.097 553.568C157.217 543.33 150.66 536.861 140.428 534.157C136.728 534.759 133.215 535.914 129.891 537.623C125.005 542.197 120.791 547.282 117.247 552.875C111.069 554.786 106.151 553.169 102.496 548.022C99.7437 519.819 96.9339 491.625 94.0665 463.444C92.5 457.58 90.1595 452.034 87.042 446.806C81.355 440.733 76.2032 434.263 71.5881 427.394C58.7223 401.996 45.1415 377.039 30.846 352.522C22.0481 323.211 15.0236 293.632 9.77246 263.785C7.48009 237.78 10.2899 212.361 18.2019 187.526C28.0362 165.342 37.8705 143.157 47.7048 120.973C57.0708 108.956 66.4368 96.9397 75.8028 84.9232C83.0914 77.0639 91.2862 70.3623 100.389 64.8186C138.733 41.7443 179.942 27.1858 224.02 21.1431Z" />
            <defs>
                <linearGradient id="grad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset={`${fill}%`} stop-color="#96F48D" />
                    <stop offset={`${fill}%`} stop-color="#96F48D00" />
                </linearGradient>
            </defs>
            <path d="M232 0.581772C216 2.04844 201.733 4.04843 200.4 4.84843C199.733 5.24843 194.933 6.3151 189.867 7.1151C173.867 9.64843 158.667 14.9817 137.333 25.9151C86.9333 51.3817 59.3333 76.9818 28.6667 126.582C13.7333 150.582 10 160.582 4.8 192.448C0.933333 216.182 0 227.782 0 251.115C0.133333 282.048 3.2 304.182 11.8667 336.582C22.1333 375.248 26.9333 385.382 53.2 423.782C83.8667 468.715 83.7333 468.315 84.8 506.448C85.6 531.115 87.7333 545.248 93.0667 559.248C95.0667 564.582 101.467 571.248 106.267 573.248C116.4 577.515 126.4 574.048 131.2 564.582C133.6 560.182 139.867 553.782 141.867 553.782C149.467 553.782 152 568.582 152.133 613.115C152.133 649.515 153.867 686.582 155.867 700.982C157.467 711.515 161.2 716.582 169.067 719.248C178.933 722.448 188.533 717.782 194 706.982C197.333 700.582 197.333 700.448 197.333 660.182C197.333 620.315 198 609.782 200.133 609.782C200.667 609.782 201.867 612.315 202.667 615.382C207.733 635.248 213.6 643.115 223.2 643.115C235.867 643.115 241.6 631.782 243.733 602.982C245.467 579.648 251.2 569.782 261.067 573.248C270.667 576.582 274 598.715 272.933 652.582C272.533 674.182 271.6 694.715 270.8 698.448C270.133 702.048 269.2 713.248 268.667 723.115C267.867 737.915 268.133 742.182 269.867 746.982C274.4 759.248 282.933 766.315 295.333 768.048C307.867 769.648 320.933 761.115 327.333 746.982C330.533 739.648 330.8 738.182 329.467 733.782C328.667 731.115 327.733 718.982 327.333 706.982C326.933 694.982 325.6 680.715 324.4 675.515C321.733 662.848 322.667 614.315 325.867 603.248C329.333 591.382 328.8 591.515 347.6 594.582C360.533 596.582 368.133 587.648 369.067 568.982C369.733 556.582 370.533 555.248 379.6 552.582C387.067 550.582 392 544.182 394.267 534.182C398.533 514.715 400.533 499.382 401.2 478.448C401.733 465.915 402.533 454.848 403.067 453.648C403.733 452.448 406.8 450.448 410.133 449.115C414 447.648 417.2 445.115 419.333 442.048C422.667 437.248 422.667 436.715 422.667 410.182V383.248L430 374.982C436.133 368.048 437.733 365.115 440.667 355.382C442.533 348.982 444.667 342.315 445.467 340.448C446.133 338.582 447.2 334.048 447.867 330.448C448.533 326.715 450.4 317.115 452 309.115C453.6 300.982 455.467 289.915 456.133 284.448C456.8 278.982 458 272.715 458.667 270.582C460.4 265.515 460.4 209.515 458.667 203.248C458 200.582 456.8 190.582 456 181.115C453.733 149.382 450.533 137.648 439.467 119.915C434.8 112.315 431.2 108.315 425.6 104.582C407.6 92.1818 389.6 71.9151 381.2 54.4485C376.933 45.9151 372.8 39.5151 369.6 36.5818C364 31.5151 334.933 17.1151 320 12.0484C303.467 6.44845 296 4.71508 282.133 3.91508C274.8 3.38175 266.4 2.44845 263.467 1.78178C255.067 -0.0848827 243.067 -0.484895 232 0.581772ZM281.333 32.1818C292.4 33.5151 307.2 36.9818 318 40.8484C328.4 44.5818 358.8 60.8484 361.333 64.0484C363.867 67.2484 366.933 76.1818 369.333 87.5151C373.867 108.848 377.333 116.048 387.2 125.648C391.733 129.915 398.133 134.715 401.333 136.448C414.4 142.982 420.667 151.648 427.733 173.782C438 205.248 439.067 214.048 438.267 253.115C437.467 292.715 435.467 304.848 425.733 331.115C422.133 341.115 419.733 345.248 414.667 350.582C411.067 354.448 407.733 359.248 407.333 361.248C406.933 363.382 405.867 367.515 405.067 370.448C404.267 373.382 403.333 386.715 402.8 400.182L402 424.448L393.2 432.848C382.133 443.115 381.733 444.715 380.8 481.115C379.733 517.515 378.133 523.382 366.667 531.115C356.4 538.182 352.4 543.115 351.2 550.582C350.667 554.048 349.067 558.048 347.733 559.382C345.333 561.782 344.8 561.915 342.933 560.048C341.867 558.848 339.6 553.648 337.867 548.448C334.4 537.515 331.6 533.782 326.933 533.782C318.667 533.782 312.133 547.915 308.667 573.782C306.133 593.515 306.267 645.248 309.2 689.915C311.333 721.515 310.667 730.715 305.733 736.448C301.733 741.248 297.733 741.515 292.667 737.515C285.333 731.782 285.333 732.048 285.333 653.248C285.333 583.382 285.2 580.315 282.667 573.248C278.8 563.248 269.333 554.315 260.8 553.115C252.8 551.915 245.733 552.982 241.333 556.182C239.467 557.515 235.6 563.115 232.8 568.582C227.733 578.048 227.467 579.115 226.667 594.048C226.133 606.182 225.333 610.315 223.733 612.048C220.4 615.248 217.733 612.448 215.867 603.382C210.4 576.448 203.2 568.982 192.8 579.382C183.067 589.115 179.867 607.515 183.6 631.115C184.533 636.582 185.333 649.248 185.333 659.248C185.333 675.248 185.067 677.915 182.8 680.582C179.2 685.115 173.333 682.982 171.2 676.448C170.267 673.648 169.067 651.115 168.267 619.115C167.467 590.182 166.133 561.115 165.2 554.448C161.2 522.715 142.667 513.248 127.333 535.115C124 539.782 122.267 541.248 118.8 541.515C113.333 542.048 108.4 537.782 107.333 531.915C106.533 527.115 104.267 499.248 102.667 475.782C101.733 460.582 99.4667 449.648 95.8667 442.848C95.0667 441.115 91.0667 435.515 87.2 430.315C83.2 425.248 78.2667 417.248 76 412.715C72 404.315 58.4 379.782 49.2 364.448C43.0667 354.048 38 340.982 34.5333 326.448C33.0667 320.582 30.6667 310.982 29.3333 305.115C27.8667 299.115 26.6667 292.982 26.6667 291.382C26.6667 289.648 26.1333 287.115 25.3333 285.782C24.6667 284.448 23.4667 279.515 22.6667 274.848C21.8667 270.182 20.8 263.515 20.1333 260.048C19.0667 253.782 20.1333 234.982 22.5333 217.782C24.5333 202.848 29.8667 186.582 39.2 166.848C41.8667 161.248 44 155.915 44 155.115C44 154.315 47.2 146.848 51.0667 138.715C61.8667 115.915 85.7333 86.7151 102.8 74.9818C129.467 56.8485 191.467 32.8484 212.933 32.3151C215.733 32.1818 219.467 31.6484 221.333 31.1151C225.6 29.6484 266.4 30.4485 281.333 32.1818Z" fill="black" />
            <path d="M162.533 185.782C145.067 194.982 141.067 222.982 151.6 263.115C158.267 288.048 158.933 292.582 158.267 305.782C157.467 320.848 159.333 329.648 164.667 335.115C169.2 339.782 171.867 340.582 177.067 338.315C185.867 334.715 187.733 324.048 185.333 291.115C184.533 279.782 183.733 268.715 183.733 266.715C183.6 263.648 185.467 261.115 191.867 255.115C208.267 239.515 210.533 222.582 199.333 200.448C195.067 192.182 191.2 188.982 182 185.782C172.133 182.582 168.667 182.582 162.533 185.782Z" fill="black" />
            <path d="M279.2 207.115C274.4 208.182 268.933 211.782 263.733 217.382C253.067 228.715 253.333 258.049 264.267 279.782C270.933 292.849 272 299.649 272 326.715C272 340.449 272.667 354.182 273.333 357.115C276 368.715 288.267 372.449 296.667 364.049C303.733 356.982 304.4 352.315 303.333 314.582L302.4 281.115L305.867 275.915C307.867 273.115 311.6 266.582 314.267 261.249C322.533 244.982 320.533 229.782 308.533 216.582C305.867 213.515 302 210.182 300.133 209.248C295.733 206.982 284.533 205.915 279.2 207.115Z" fill="black" />
            <path d="M384.667 284.182C376.4 292.315 367.867 299.248 362.4 302.315C351.867 308.182 346.667 313.782 346.667 319.248C346.667 325.782 353.467 326.715 369.067 322.315C370.933 321.782 372 322.048 372 323.115C372 323.915 368.4 331.382 364 339.782C359.6 348.048 352.933 362.848 349.2 372.582C341.333 393.648 341.2 393.915 328 407.915C319.733 416.582 316.8 420.848 313.333 429.248C303.867 452.182 298.267 460.582 288.933 465.915C284.133 468.582 281.333 469.115 270 469.248C260.933 469.382 255.067 470.048 251.733 471.648C239.6 476.982 228.533 472.715 218 458.582C214.267 453.382 209.333 447.248 207.067 444.982C200.8 438.182 187.333 430.182 176 426.448C158.667 420.715 157.6 419.648 147.067 397.382C142.933 388.315 140.533 385.382 130.8 376.715C107.6 355.915 104.667 352.582 101.6 342.182C97.4667 328.848 97.7334 325.782 103.333 320.848C108.933 315.915 109.333 311.515 104.667 307.115C101.733 304.315 99.4667 303.915 84.9334 302.848C64.8 301.382 58.6667 302.182 54.1334 306.715C49.2 311.515 48.4 315.915 51.4667 321.382C54.5334 327.248 59.6 329.782 70.4 330.848L79.0667 331.782L82.9334 343.115C84.9334 349.248 89.4667 360.048 92.8 366.982C98.1334 377.915 100.8 381.515 112.267 392.982C126.933 407.648 129.467 411.782 132.8 425.248C134 430.315 136.4 437.248 138.133 440.582C142.933 450.182 147.467 453.115 162.267 456.582C185.467 461.782 196.267 469.915 207.333 490.982C215.6 506.582 218.667 509.115 229.733 509.115C237.067 509.115 239.2 508.448 247.333 503.648C260.533 495.782 266.133 494.448 274.267 497.382C277.733 498.582 284.667 499.648 289.467 499.648C301.333 499.782 306.8 496.182 313.733 483.648C319.333 473.515 325.867 456.182 327.333 447.382C328.4 440.448 334.133 433.515 341.6 429.648C348.667 426.048 356.8 418.448 360.667 411.915C365.067 404.315 372.533 383.248 375.333 370.448C376.533 364.582 380.533 352.982 384.133 344.715C390.133 330.982 390.667 328.848 390.667 319.248C390.667 308.715 390.667 308.582 396.8 300.848C405.467 289.782 410.667 281.648 410.667 279.115C410.667 274.848 406.667 271.115 402.267 271.115C398.667 271.115 395.867 273.248 384.667 284.182Z" fill="black" />
        </svg>
    );
};

export default LogoAnimation;