import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Scroll.css";
import PropTypes from "prop-types";
import { MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import FaceIcon from "@material-ui/icons/Face";
import Online from "./Online";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { isAuth, signout } from "../../class/storage";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.dark,

    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "#000000",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "white",
      },
  },
  IconColor: {
    color: "#000000",
  },
  content: {
    color: theme.palette.text.dark,
    borderTopRightRadius: theme.spacing(0),
    borderBottomRightRadius: theme.spacing(0),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    padding: theme.spacing(0.5, 3),
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color='inherit' className={classes.labelIcon} />
          <Typography variant='body2' className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant='caption' color='inherit'>
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function GmailTreeView() {
  const classes = useStyles();

  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [adminHub, setAdminHub] = useState(false);

  const [expanded, setExpanded] = useState([]);
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  useEffect(() => {
    if (!isAuth()) {
      //Router.replace("/signin");
      return;
    } else {
      if (isAuth().checkSum === "ad587") {
        //console.log("admin");
        setAdmin(true);
      } else {
        //console.log("user");
        setUser(true);
        setAdmin(false);
      }
    }

    if (isAuth().role === "admin" || isAuth().role === "hub") {
      setAdminHub(true);
    }
  }, []);

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      expanded={expanded}
      onNodeToggle={handleToggle}>
      <Link
        to={isAuth().role === "teacher" ? "/admin" : "/home"}
        style={{ textDecoration: "none", color: "#424242" }}>
        <StyledTreeItem
          nodeId='95'
          labelText={isAuth() && isAuth().name}
          labelIcon={Online}
          style={{
            marginLeft: "-13px",
          }}
        />
      </Link>

      {/* <Link
        to='/auth/account'
        style={{ textDecoration: "none", color: "#40454D" }}>
        <StyledTreeItem
          nodeId='2'
          labelText='Make Account'
          labelIcon={HowToRegIcon}
        />
      </Link> */}

      <Link to='/profile' style={{ textDecoration: "none", color: "#424242" }}>
        <StyledTreeItem nodeId='5' labelText='Profile' labelIcon={FaceIcon} />
      </Link>

      {isAuth().role === "student" && (
        <Link
          to='/enrolment'
          style={{ textDecoration: "none", color: "#424242" }}>
          <StyledTreeItem
            nodeId='16'
            labelText='Enroll Subject'
            labelIcon={MenuBookIcon}
          />
        </Link>
      )}

      {isAuth().role === "teacher" && (
        <Link to='/teach' style={{ textDecoration: "none", color: "#424242" }}>
          <StyledTreeItem
            nodeId='17'
            labelText='Teach'
            labelIcon={PostAddIcon}
          />
        </Link>
      )}

      {isAuth().role === "teacher" && (
        <Link to='/group' style={{ textDecoration: "none", color: "#424242" }}>
          <StyledTreeItem
            nodeId='19'
            labelText='Group'
            labelIcon={AllInclusiveIcon}
          />
        </Link>
      )}

      {isAuth().role === "teacher" && (
        <Link
          to='/classdetails'
          style={{ textDecoration: "none", color: "#424242" }}>
          <StyledTreeItem
            nodeId='17'
            labelText='Class Details'
            labelIcon={ArtTrackIcon}
          />
        </Link>
      )}

      <Link to='#' style={{ textDecoration: "none", color: "#424242" }}>
        <StyledTreeItem
          nodeId='20'
          labelText='Logout'
          labelIcon={ExitToAppIcon}
          onClick={() => {
            signout(() => {
              window.location.href = "/";
            });
          }}
        />
      </Link>
    </TreeView>
  );
}
