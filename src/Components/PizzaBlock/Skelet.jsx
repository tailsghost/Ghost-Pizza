import ContentLoader from 'react-content-loader';

const SkeletonBlock = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="122" cy="122" r="122" />
    <rect x="0" y="311" rx="10" ry="10" width="244" height="90" />
    <rect x="0" y="420" rx="10" ry="10" width="115" height="30" />
    <rect x="132" y="420" rx="10" ry="10" width="115" height="30" />
    <rect x="0" y="263" rx="10" ry="10" width="244" height="30" />
  </ContentLoader>
);

export default SkeletonBlock;
