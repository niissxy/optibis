import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
      <Link to="/app" className="flex items-center gap-1 hover:text-navy transition-colors">
        <Home className="w-3 h-3" />
      </Link>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          {item.path && i < items.length - 1 ? (
            <Link to={item.path} className="hover:text-navy transition-colors">{item.label}</Link>
          ) : (
            <span className="text-navy font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}