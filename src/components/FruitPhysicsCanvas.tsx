import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Matter from 'matter-js';
import { soundManager } from '../utils/sound';

export interface FruitPhysicsHandle {
  spawnFruit: (clientX?: number, clientY?: number) => void;
  resetDrop: () => void;
  toggleGravity: () => boolean;
  getFruitCount: () => number;
}

interface FruitPhysicsProps {
  onCountChange?: (count: number) => void;
  isMuted?: boolean;
}

interface CardItem {
  body: Matter.Body;
  channelIndex: number;
  width: number;
  height: number;
  id: string;
  idleSpin: number;
}

const CARD_SOUNDS_ENABLED = false;
const playDrop = (pitch: number) => {
  if (CARD_SOUNDS_ENABLED) soundManager.playDrop(pitch);
};
const playBounce = (speed: number) => {
  if (CARD_SOUNDS_ENABLED) soundManager.playBounce(speed);
};
const playBoing = (vol: number) => {
  if (CARD_SOUNDS_ENABLED) soundManager.playBoing(vol);
};

const MAVIN_CHANNELS = [
  { type: 'video' as const, src: 'https://pub-00276c480a6b455b8d30567940f580c8.r2.dev/SaveTikTok.to_7578543149400739080_hd.mp4', remoteSrc: 'https://pub-00276c480a6b455b8d30567940f580c8.r2.dev/SaveTikTok.to_7578543149400739080_hd.mp4', label: 'MAVIN • Video 01', artist: 'MAVIN', title: 'Video 01' },
  { type: 'video' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/snaptik_7630081594912476424_v3.mp4', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/snaptik_7630081594912476424_v3.mp4', label: 'MAVIN • Video 02', artist: 'MAVIN', title: 'Video 02' },
  { type: 'video' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/snaptik_7685386291009162503_v3.mp4', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/snaptik_7685386291009162503_v3.mp4', label: 'MAVIN • Video 03', artist: 'MAVIN', title: 'Video 03' },
  { type: 'video' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/snaptik_7689537019982171400_v3.mp4', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/snaptik_7689537019982171400_v3.mp4', label: 'MAVIN • Video 04', artist: 'MAVIN', title: 'Video 04' },
  { type: 'image' as const, src: 'https://pub-00276c480a6b455b8d30567940f580c8.r2.dev/SaveTikTok.to_7676223592820002055_1.jpeg', remoteSrc: 'https://pub-00276c480a6b455b8d30567940f580c8.r2.dev/SaveTikTok.to_7676223592820002055_1.jpeg', label: 'MAVIN • Image 01', artist: 'MAVIN', title: 'Image 01' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a1.jpg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a1.jpg', label: 'MAVIN • Image 02', artist: 'MAVIN', title: 'Image 02' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a3.jpeg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a3.jpeg', label: 'MAVIN • Image 03', artist: 'MAVIN', title: 'Image 03' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a4.jpeg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a4.jpeg', label: 'MAVIN • Image 04', artist: 'MAVIN', title: 'Image 04' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a5.jpeg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a5.jpeg', label: 'MAVIN • Image 05', artist: 'MAVIN', title: 'Image 05' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a6.jpeg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a6.jpeg', label: 'MAVIN • Image 06', artist: 'MAVIN', title: 'Image 06' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a7.jpeg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a7.jpeg', label: 'MAVIN • Image 07', artist: 'MAVIN', title: 'Image 07' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a9.jpg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a9.jpg', label: 'MAVIN • Image 08', artist: 'MAVIN', title: 'Image 08' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a10.jpg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a10.jpg', label: 'MAVIN • Image 09', artist: 'MAVIN', title: 'Image 09' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a12.jpg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a12.jpg', label: 'MAVIN • Image 10', artist: 'MAVIN', title: 'Image 10' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a15.jpeg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a15.jpeg', label: 'MAVIN • Image 11', artist: 'MAVIN', title: 'Image 11' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a14.jpeg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a14.jpeg', label: 'MAVIN • Image 12', artist: 'MAVIN', title: 'Image 12' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a13.jpeg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a13.jpeg', label: 'MAVIN • Image 13', artist: 'MAVIN', title: 'Image 13' },
  { type: 'image' as const, src: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a16.jpeg', remoteSrc: 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/a16.jpeg', label: 'MAVIN • Image 14', artist: 'MAVIN', title: 'Image 14' },
];

const VIDEO_COUNT = MAVIN_CHANNELS.filter((c) => c.type === 'video').length;
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

export const FruitPhysicsCanvas = forwardRef<FruitPhysicsHandle, FruitPhysicsProps>(
  ({ onCountChange, isMuted = true }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const wallsRef = useRef<Matter.Body[]>([]);
    const cardsRef = useRef<CardItem[]>([]);

    const videoElementsRef = useRef<HTMLVideoElement[]>([]);
    const imageElementsRef = useRef<HTMLImageElement[]>([]);
    const videoCacheRef = useRef<HTMLCanvasElement[]>([]);

    const activeChannelRef = useRef<number>(0);
    const isAudioActiveRef = useRef<boolean>(!isMuted);

    const dragRef = useRef<{
      body: Matter.Body | null;
      history: { x: number; y: number; time: number }[];
      startPos: { x: number; y: number };
      hasMoved: boolean;
    }>({
      body: null,
      history: [],
      startPos: { x: 0, y: 0 },
      hasMoved: false,
    });

    const [zeroGravity, setZeroGravity] = useState(false);
    const [activeChannelLabel, setActiveChannelLabel] = useState<string>(
      MAVIN_CHANNELS[0].label
    );
    const [audioActive, setAudioActive] = useState<boolean>(!isMuted);

    const pickChannelIndex = (): number =>
      Math.floor(Math.random() * MAVIN_CHANNELS.length);

    const updateAudioOutput = (channelIdx: number, enableSound: boolean) => {
      activeChannelRef.current = channelIdx;
      isAudioActiveRef.current = enableSound;
      setAudioActive(enableSound);

      const videoCount = Math.max(1, videoElementsRef.current.length);
      videoElementsRef.current.forEach((vid, vIdx) => {
        if (!vid) return;
        if (enableSound && vIdx === channelIdx % videoCount) {
          vid.muted = true;
          vid.volume = 0.7;
          vid.play().catch(() => {});
        } else {
          vid.muted = true;
        }
      });

      if (MAVIN_CHANNELS[channelIdx]) {
        setActiveChannelLabel(MAVIN_CHANNELS[channelIdx].label);
      }
    };

    useEffect(() => {
      updateAudioOutput(activeChannelRef.current, !isMuted);
    }, [isMuted]);

    const getCanvasCoords = (e: React.PointerEvent | PointerEvent) => {
      if (!canvasRef.current) return { x: 0, y: 0 };
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const updateWalls = (width: number, height: number, engine: Matter.Engine) => {
      if (wallsRef.current.length > 0) {
        Matter.Composite.remove(engine.world, wallsRef.current);
        wallsRef.current = [];
      }

      const wallThickness = 160;
      const floor = Matter.Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width + 400,
        wallThickness,
        { isStatic: true, restitution: 0.15, friction: 0.9, label: 'floor' }
      );
      const leftWall = Matter.Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true, restitution: 0.2, friction: 0.5, label: 'left-wall' }
      );
      const rightWall = Matter.Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true, restitution: 0.2, friction: 0.5, label: 'right-wall' }
      );

      wallsRef.current = [floor, leftWall, rightWall];
      Matter.Composite.add(engine.world, wallsRef.current);
    };

    const spawnSingleCard = (
      engine: Matter.Engine,
      x?: number,
      y?: number,
      customSize?: number,
      chIndex?: number
    ) => {
      if (!containerRef.current) return;
      const { clientWidth: width } = containerRef.current;
      const isMobile = width < 640;
      const baseSize = customSize || (isMobile ? 60 : 85);

      const sizeMult = randomBetween(0.95, 1.15);
      const size = Math.max(55, baseSize * sizeMult);
      const w = size;
      const h = size;

      const posX = x !== undefined ? x : randomBetween(width * 0.15, width * 0.85);
      const posY = y !== undefined ? y : -h - randomBetween(20, 120);

      const chosenChannelIndex = chIndex !== undefined ? chIndex : pickChannelIndex();

      const body = Matter.Bodies.rectangle(posX, posY, w, h, {
        restitution: 0.5,
        friction: 0.25,
        frictionStatic: 0.45,
        frictionAir: 0.012,
        slop: 0.05,
        sleepThreshold: 35,
        label: `card-${chosenChannelIndex}`,
      });

      Matter.Body.setAngle(body, randomBetween(-0.35, 0.35));
      const idleSpin = randomBetween(-0.0004, 0.0004);
      Matter.Body.setAngularVelocity(body, idleSpin);

      const cardItem: CardItem = {
        body,
        channelIndex: chosenChannelIndex,
        width: w,
        height: h,
        id: Math.random().toString(36).substring(2, 9),
        idleSpin,
      };

      cardsRef.current.push(cardItem);
      Matter.Composite.add(engine.world, body);

      playDrop(1 + randomBetween(-0.2, 0.3));
      onCountChange?.(cardsRef.current.length);
    };

    const populateInitialDrop = (
      engine: Matter.Engine,
      width: number,
      height: number
    ) => {
      if (cardsRef.current.length > 0) {
        Matter.Composite.remove(engine.world, cardsRef.current.map((c) => c.body));
        cardsRef.current = [];
      }

      const isMobile = width < 640;
      const cardCount = isMobile ? 18 : 28;
      const baseSize = isMobile ? 60 : 85;

      const items: CardItem[] = [];

      for (let r = 0; r < cardCount; r++) {
        const a = randomBetween(0.65, 1.85);
        const d = Math.max(55, baseSize * a);
        const w = d;
        const h = d;

        const posX =
          ((r + 0.5) / cardCount) * width + randomBetween(-width * 0.08, width * 0.08);
        const posY = -h - r * 45 - randomBetween(0, 200);
        const initialAngle = randomBetween(-0.3, 0.3);
        const idleSpin = randomBetween(-0.0004, 0.0004);
        const channelIndex = Math.floor(Math.random() * MAVIN_CHANNELS.length);

        const body = Matter.Bodies.rectangle(posX, posY, w, h, {
          restitution: 0.5,
          friction: 0.25,
          frictionStatic: 0.45,
          frictionAir: 0.012,
          slop: 0.05,
          sleepThreshold: 35,
          label: `card-${channelIndex}`,
        });

        Matter.Body.setAngle(body, initialAngle);
        Matter.Body.setAngularVelocity(body, randomBetween(-0.08, 0.08));
        Matter.Sleeping.set(body, false);

        items.push({
          body,
          channelIndex,
          width: w,
          height: h,
          id: `card-init-${r}`,
          idleSpin,
        });
      }

      cardsRef.current = items;
      Matter.Composite.add(
        engine.world,
        items.map((it) => it.body)
      );
      onCountChange?.(items.length);
    };

    useImperativeHandle(ref, () => ({
      spawnFruit: (clientX?: number, clientY?: number) => {
        if (!engineRef.current || !canvasRef.current || !containerRef.current) return;
        const { clientWidth } = containerRef.current;

        if (clientX !== undefined && clientY !== undefined) {
          const rect = canvasRef.current.getBoundingClientRect();
          const x = clientX - rect.left;
          spawnSingleCard(engineRef.current, x, undefined);
        } else {
          spawnSingleCard(
            engineRef.current,
            randomBetween(clientWidth * 0.2, clientWidth * 0.8),
            undefined
          );
        }
      },
      resetDrop: () => {
        if (!engineRef.current || !containerRef.current) return;
        populateInitialDrop(
          engineRef.current,
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        );
      },
      toggleGravity: () => {
        if (!engineRef.current) return false;
        const next = !zeroGravity;
        setZeroGravity(next);
        engineRef.current.gravity.y = next ? -0.15 : 2.5; // INCREASED FALL SPEED
        cardsRef.current.forEach((c) => Matter.Sleeping.set(c.body, false));
        return next;
      },
      getFruitCount: () => cardsRef.current.length,
    }));

    const roundRectPath = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        const rad = Math.min(r, w / 2, h / 2);
        ctx.moveTo(x + rad, y);
        ctx.lineTo(x + w - rad, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
        ctx.lineTo(x + w, y + h - rad);
        ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
        ctx.lineTo(x + rad, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
        ctx.lineTo(x, y + rad);
        ctx.quadraticCurveTo(x, y, x + rad, y);
        ctx.closePath();
      }
    };

    const drawCard = (ctx: CanvasRenderingContext2D, item: CardItem) => {
      const { body, width: w, height: h, channelIndex } = item;
      const channel = MAVIN_CHANNELS[channelIndex % MAVIN_CHANNELS.length];
      const isTuned =
        channel.type === 'video' &&
        channelIndex === activeChannelRef.current &&
        isAudioActiveRef.current;

      ctx.save();
      ctx.translate(body.position.x, body.position.y);
      ctx.rotate(body.angle);

      const cardRadius = Math.max(6, w * 0.08);
      const pad = Math.max(3, w * 0.045);
      const footerSpace = Math.max(12, w * 0.13);
      const mediaInset = pad;
      const mediaW = w - mediaInset * 2;
      const mediaH = h - mediaInset * 2 - footerSpace;
      const mediaX = -w / 2 + mediaInset;
      const mediaY = -h / 2 + mediaInset;
      const mediaRadius = Math.max(3, cardRadius - 3);

      roundRectPath(ctx, -w / 2, -h / 2, w, h, cardRadius);
      ctx.fillStyle = 'rgba(18, 18, 18, 0.95)';
      ctx.fill();

      roundRectPath(ctx, -w / 2, -h / 2, w, h, cardRadius);
      const grad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
      grad.addColorStop(0, '#1a1a1c');
      grad.addColorStop(1, '#0e0e10');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(253, 196, 78, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      roundRectPath(ctx, mediaX, mediaY, mediaW, mediaH, mediaRadius);
      ctx.clip();

      ctx.fillStyle = '#000';
      ctx.fillRect(mediaX, mediaY, mediaW, mediaH);

      let mediaDrawn = false;

      const drawMediaCover = (
        source: CanvasImageSource,
        srcW: number,
        srcH: number
      ) => {
        if (srcW <= 0 || srcH <= 0) return false;

        const screenAspect = mediaW / mediaH;
        const srcAspect = srcW / srcH;

        let drawW = mediaW;
        let drawH = mediaH;
        let drawX = mediaX;
        let drawY = mediaY;

        if (srcAspect > screenAspect) {
          drawH = mediaH;
          drawW = mediaH * srcAspect;
          drawX = mediaX + (mediaW - drawW) / 2;
        } else {
          drawW = mediaW;
          drawH = mediaW / srcAspect;
          drawY = mediaY + (mediaH - drawH) / 2;
        }

        ctx.drawImage(source, drawX, drawY, drawW, drawH);
        return true;
      };

      if (channel.type === 'video') {
        const videoCount = Math.max(1, videoElementsRef.current.length);
        const vIdx = channelIndex % videoCount;
        const cache = videoCacheRef.current[vIdx];
        if (cache && cache.width > 0) {
          mediaDrawn = drawMediaCover(cache, cache.width, cache.height);
        }
      } else {
        const imgIdx = channelIndex - VIDEO_COUNT;
        const img = imageElementsRef.current[imgIdx];
        if (img && img.complete && img.naturalWidth > 0) {
          mediaDrawn = drawMediaCover(img, img.naturalWidth, img.naturalHeight);
        }
      }

      if (!mediaDrawn) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(mediaX, mediaY, mediaW, mediaH);
        ctx.fillStyle = '#fdc44e';
        ctx.font = `bold ${Math.max(7, w * 0.06)}px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('MAVIN', 0, mediaY + mediaH / 2);
        ctx.textAlign = 'left';
      }

      const sheen = ctx.createLinearGradient(mediaX, mediaY, mediaX, mediaY + mediaH * 0.5);
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
      sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sheen;
      ctx.fillRect(mediaX, mediaY, mediaW, mediaH * 0.5);

      ctx.restore();

      const showFooterText = w >= 55;
      if (showFooterText) {
        const footerY = mediaY + mediaH + pad * 0.5;
        const footerH = h / 2 - (footerY + pad * 0.5);

        ctx.fillStyle = '#fdc44e';
        ctx.font = `600 ${Math.max(6, w * 0.058)}px system-ui, -apple-system, sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        const artistText =
          channel.artist.length > 14 ? channel.artist.slice(0, 13) + '…' : channel.artist;
        ctx.fillText(artistText, -w / 2 + pad, footerY + footerH * 0.35);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.62)';
        ctx.font = `500 ${Math.max(6, w * 0.048)}px system-ui, -apple-system, sans-serif`;
        const titleText =
          channel.title.length > 18 ? channel.title.slice(0, 17) + '…' : channel.title;
        ctx.fillText(titleText, -w / 2 + pad, footerY + footerH * 0.78);

        ctx.fillStyle = isTuned ? '#fdc44e' : 'rgba(253, 196, 78, 0.5)';
        ctx.font = `800 ${Math.max(6, w * 0.052)}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'right';
        ctx.fillText('MAVIN', w / 2 - pad, footerY + footerH * 0.55);
        ctx.textAlign = 'left';
      }

      if (isTuned && w >= 70) {
        const pillW = Math.max(28, w * 0.22);
        const pillH = Math.max(10, w * 0.075);
        ctx.fillStyle = 'rgba(0,0,0,0.65)';
        roundRectPath(ctx, mediaX + 4, mediaY + 4, pillW, pillH, pillH / 2);
        ctx.fill();
        ctx.fillStyle = '#fdc44e';
        ctx.beginPath();
        ctx.arc(
          mediaX + 4 + pillH * 0.45,
          mediaY + 4 + pillH / 2,
          Math.max(1.5, pillH * 0.18),
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.font = `700 ${Math.max(6, w * 0.04)}px system-ui, -apple-system, sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.fillText('LIVE', mediaX + 4 + pillH * 0.8, mediaY + 4 + pillH / 2 + 0.5);
      }

      ctx.restore();
    };

    useEffect(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      let isDestroyed = false;

      const videos: HTMLVideoElement[] = [];
      const videoConfigs = MAVIN_CHANNELS.filter((c) => c.type === 'video');
      videoConfigs.forEach((cfg, idx) => {
        const vid = document.createElement('video');
        vid.src = cfg.src;
        vid.loop = true;
        vid.muted = true;
        vid.autoplay = true;
        vid.playsInline = true;
        vid.preload = 'metadata';
        vid.playbackRate = 0.6;
        vid.setAttribute('playsinline', '');
        vid.setAttribute('webkit-playsinline', '');
        vid.setAttribute('muted', '');
        vid.setAttribute('loop', '');
        vid.setAttribute('autoplay', '');

        vid.style.cssText =
          'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
        document.body.appendChild(vid);

        let triedRemote = false;
        vid.onerror = () => {
          if (!triedRemote && cfg.remoteSrc && cfg.remoteSrc !== vid.src) {
            triedRemote = true;
            vid.src = cfg.remoteSrc;
            vid.load();
            vid.play().catch(() => {});
          }
        };

        vid.load();
        const tryPlay = () => {
          vid.play().catch(() => {});
        };
        tryPlay();
        vid.addEventListener('loadeddata', tryPlay, { once: true });
        const onVis = () => {
          if (!document.hidden) tryPlay();
        };
        document.addEventListener('visibilitychange', onVis);

        videos[idx] = vid;
        (vid as any).__onVis = onVis;
      });
      videoElementsRef.current = videos;

      videoCacheRef.current = videos.map(() => {
        const c = document.createElement('canvas');
        c.width = 192;
        c.height = 192;
        return c;
      });

      const images: HTMLImageElement[] = [];
      const imageConfigs = MAVIN_CHANNELS.filter((c) => c.type === 'image');
      imageConfigs.forEach((cfg, idx) => {
        const img = new Image();
        let triedRemote = false;
        img.onerror = () => {
          if (!triedRemote && cfg.remoteSrc && cfg.remoteSrc !== img.src) {
            triedRemote = true;
            img.src = cfg.remoteSrc;
          }
        };
        img.src = cfg.src;
        images[idx] = img;
      });
      imageElementsRef.current = images;

      const engine = Matter.Engine.create({
        gravity: { x: 0, y: 2.5, scale: 0.001 }, // INCREASED FALL SPEED
      });
      engineRef.current = engine;

      const onCollisionStart = (event: Matter.IEventCollision<Matter.Engine>) => {
        event.pairs.forEach((pair) => {
          const speedA = Matter.Vector.magnitude(pair.bodyA.velocity);
          const speedB = Matter.Vector.magnitude(pair.bodyB.velocity);
          const relativeSpeed = Math.max(speedA, speedB);
          if (relativeSpeed > 2.2) {
            playBounce(relativeSpeed);
          }
        });
      };
      Matter.Events.on(engine, 'collisionStart', onCollisionStart);

      const handleResize = () => {
        if (!container || !canvas) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);
        }

        updateWalls(width, height, engine);
      };

      handleResize();
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);

      populateInitialDrop(engine, container.clientWidth, container.clientHeight);

      let lastTime = performance.now();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const tick = (now: number) => {
        if (isDestroyed) return;

        const delta = Math.min(now - lastTime, 33.33);
        lastTime = now;

        Matter.Engine.update(engine, delta > 0 ? delta : 16.67);

        for (let i = 0; i < videos.length; i++) {
          const vid = videos[i];
          const cache = videoCacheRef.current[i];
          if (!vid || !cache) continue;
          if (vid.readyState >= 2 && vid.videoWidth > 0) {
            const cx = cache.getContext('2d');
            if (cx) {
              const cw = cache.width;
              const ch = cache.height;
              const srcAspect = vid.videoWidth / vid.videoHeight;
              const dstAspect = cw / ch;
              let dw = cw;
              let dh = ch;
              let dx = 0;
              let dy = 0;

              if (srcAspect > dstAspect) {
                dh = ch;
                dw = ch * srcAspect;
                dx = (cw - dw) / 2;
              } else {
                dw = cw;
                dh = cw / srcAspect;
                dy = (ch - dh) / 2;
              }
              cx.fillStyle = '#000';
              cx.fillRect(0, 0, cw, ch);
              cx.drawImage(vid, dx, dy, dw, dh);
            }
          }
        }

        const width = container.clientWidth;
        const height = container.clientHeight;

        ctx.clearRect(0, 0, width, height);

        cardsRef.current.forEach((item) => {
          drawCard(ctx, item);
        });

        animFrameRef.current = requestAnimationFrame(tick);
      };

      animFrameRef.current = requestAnimationFrame(tick);

      return () => {
        isDestroyed = true;
        resizeObserver.disconnect();
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

        videos.forEach((v) => {
          try {
            const onVis = (v as any).__onVis;
            if (onVis) {
              document.removeEventListener('visibilitychange', onVis);
            }
            v.pause();
            v.removeAttribute('src');
            v.load();
            v.remove();
          } catch {
            /* noop */
          }
        });

        Matter.Events.off(engine, 'collisionStart', onCollisionStart);
        Matter.Composite.clear(engine.world, false);
        Matter.Engine.clear(engine);
      };
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!engineRef.current || !canvasRef.current) return;
      const coords = getCanvasCoords(e);
      const bodies = cardsRef.current.map((c) => c.body);

      const hitBodies = Matter.Query.point(bodies, coords);
      if (hitBodies.length > 0) {
               const targetBody = hitBodies[hitBodies.length - 1];
        Matter.Sleeping.set(targetBody, false);

        // Smooth Drag Hack: Pause physics on the body while dragging
        Matter.Body.setStatic(targetBody, true);

        const touched = cardsRef.current.find((c) => c.body === targetBody);
        if (touched) {
          updateAudioOutput(touched.channelIndex, true);
          playBoing(0.12);
        }

        dragRef.current = {
          body: targetBody,
          history: [{ x: coords.x, y: coords.y, time: performance.now() }],
          startPos: { x: coords.x, y: coords.y },
          hasMoved: false,
        };

        canvasRef.current.setPointerCapture(e.pointerId);
      } else {
        dragRef.current = {
          body: null,
          history: [],
          startPos: { x: coords.x, y: coords.y },
          hasMoved: false,
        };
      }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const coords = getCanvasCoords(e);
      const { body, history, startPos } = dragRef.current;

      const dx = coords.x - startPos.x;
      const dy = coords.y - startPos.y;
      if (Math.hypot(dx, dy) > 5) {
        dragRef.current.hasMoved = true;
      }

      if (body) {
        const now = performance.now();
        history.push({ x: coords.x, y: coords.y, time: now });
        if (history.length > 8) history.shift();

        // Pixel-perfect 1:1 tracking because the body is static
        Matter.Body.setPosition(body, { x: coords.x, y: coords.y });
      }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const coords = getCanvasCoords(e);
      const { body, history, hasMoved } = dragRef.current;

      if (body) {
        // Re-enable physics so the card falls again
        Matter.Body.setStatic(body, false);

        if (history.length >= 2) {
          const first = history[0];
          const last = history[history.length - 1];
          const dt = Math.max(16, last.time - first.time);
          const throwPower = 1.2;
          const vx = ((last.x - first.x) / dt) * 16.67 * throwPower;
          const vy = ((last.y - first.y) / dt) * 16.67 * throwPower;

          Matter.Body.setVelocity(body, { x: vx, y: vy });
          Matter.Body.setAngularVelocity(body, vx * 0.02);
        }

        if (canvasRef.current?.hasPointerCapture(e.pointerId)) {
          canvasRef.current.releasePointerCapture(e.pointerId);
        }
      } else if (!hasMoved && engineRef.current) {
        spawnSingleCard(engineRef.current, coords.x, undefined);
      }

      dragRef.current = {
        body: null,
        history: [],
        startPos: { x: 0, y: 0 },
        hasMoved: false,
      };
    };

    return (
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
        style={{ touchAction: 'none' }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`w-full h-full block touch-none select-none transition-cursor ${
            dragRef.current.body ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          aria-label="Interactive Floating Mavin Album Covers"
          role="application"
        />

        {audioActive && (
          <div className="absolute top-4 left-6 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#fdc44e]/30 text-white text-xs font-mono shadow-md animate-in fade-in duration-200">
            <span className="w-2 h-2 rounded-full bg-[#fdc44e] animate-pulse" />
            <span className="text-[#fdc44e] font-semibold">{activeChannelLabel}</span>
          </div>
        )}
      </div>
    );
  }
);

FruitPhysicsCanvas.displayName = 'FruitPhysicsCanvas';