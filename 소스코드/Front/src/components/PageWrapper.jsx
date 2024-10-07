import React, { useEffect, useState } from "react";

const PageWrapper = ({ children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  return <div className={visible ? "page-enter" : "page-exit"}>{children}</div>;
};

export default PageWrapper;
