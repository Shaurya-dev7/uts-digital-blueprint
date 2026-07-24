import React from 'react';
import { FileText, Download, ShieldCheck, HardDrive, FileJson, FileIcon } from 'lucide-react';
import { Document } from '@/types/catalog';
import { Card } from '@/components/ui/card';

interface DocumentCardProps {
  document: Document;
}

const getTypeConfig = (type: Document['type']) => {
  switch (type) {
    case 'Brochure':
      return { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' };
    case 'Datasheet':
      return { icon: HardDrive, color: 'text-indigo-500', bg: 'bg-indigo-50' };
    case 'Manual':
      return { icon: FileJson, color: 'text-amber-500', bg: 'bg-amber-50' };
    case 'Certificate':
      return { icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' };
    case 'Warranty':
      return { icon: ShieldCheck, color: 'text-teal-500', bg: 'bg-teal-50' };
    case 'Catalog':
      return { icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' };
    default:
      return { icon: FileIcon, color: 'text-slate-500', bg: 'bg-slate-50' };
  }
};

export function DocumentCard({ document }: DocumentCardProps) {
  const config = getTypeConfig(document.type);
  const Icon = config.icon;

  return (
    <Card className="flex items-center p-4 border border-slate-200 hover:border-[#F97316] transition-colors group">
      <div className={`p-3 rounded-xl ${config.bg} ${config.color} mr-4`}>
        <Icon className="w-6 h-6" />
      </div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-slate-800 line-clamp-1 group-hover:text-[#F97316] transition-colors">
          {document.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
          <span className="uppercase font-medium tracking-wider">{document.type}</span>
          {document.fileSize && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{document.fileSize}</span>
            </>
          )}
        </div>
      </div>

      <a 
        href={document.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-3 text-slate-400 hover:text-white hover:bg-[#F97316] rounded-full transition-colors flex-shrink-0"
        title={`Download ${document.title}`}
      >
        <Download className="w-5 h-5" />
      </a>
    </Card>
  );
}
