'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Sidebar () {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarAnimation = {
    open: {
      width      : '16rem',
      transition : {
        damping: 30
      }
    },
    close: {
      width      : '4rem',
      transition : {
        damping: 30
      }
    }
  };

  return (
    <motion.div
      variants={sidebarAnimation}
      animate={isOpen ? 'open' : 'close'}
      className="bg-white text-black  shadow-xl z-[999] w-[16rem] max-w-[18-rem] h-screen overflow-hidden md:relative fixed"
    >
      <div className="flex items-center gap-3 font-medium border-b border-slate-300 py-3 mx-3">
        <Image
          src="/icons8-binoculars.svg"
          width={50}
          height={30}
          alt="Picture of the author"
        />
        <span className="text-xl whitespace-pre">Dashboard</span>
      </div>

      <div className="flex flex-col h-full">
        <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
          <li>
            <Link className={'link'} href="/dashboard/users">
              <i
                className="pi pi-users min-w-max"
                style={{ fontSize: '1.5rem' }}
              ></i>
              Usuarios
            </Link>
          </li>
          <li>
            <Link className={'link'} href="/dashboard/references">
              <i
                className="pi pi-wrench min-w-max"
                style={{ fontSize: '1.5rem' }}
              ></i>
              Referencias
            </Link>
          </li>

          {isOpen
            ? (
            <div className="border-y py-5 border-slate-300">
              <small className="pl-3 text-slate-500 inline-block mb-2">
                Categorias secciones
              </small>
            </div>
              )
            : (
            <></>
              )}
          <li>
            <Link className="link" href="/dashboard/references">
              <i className="pi pi-wrench" style={{ fontSize: '1.5rem' }}></i>
              Referencias
            </Link>
          </li>
        </ul>
      </div>

      <motion.i
        animate={
          isOpen
            ? { x: 0, y: 0, rotate: 0 }
            : {
                x      : 25,
                y      : 0,
                rotate : 180,
                float  : 'left'
              }
        }
        transition={{ duration: 0 }}
        className="pi pi-angle-left absolute w-fit h-fit z-50 right-2 top-5 cursor-pointer md:block hidden"
        style={{ fontSize: '2rem' }}
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      ></motion.i>
    </motion.div>
  );
}
