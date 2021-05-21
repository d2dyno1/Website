<script>
    import { onMount } from 'svelte';
    import { releaseEndpoint, storeId, githubUrl } from './stores';
    import { Title, Subtext } from 'components/Text';
    import { Flex } from 'components/Flex';
    import { Button } from 'components/Button';
    import { PageSection } from 'components/PageSection';
    import Navbar from './Navbar.svelte';

    let canvas;
    let version = '';

    async function getReleaseVersion(endpoint) {
        return await fetch(endpoint).then(result => result.json()).then(result => {
            if (result) return result.tag_name;
        }).catch(err => {
            console.error(err);
            return '';
        });
    }

    onMount(() => {

        document.body.className = 'theme-light';

        // Canvas
        let time = 0;
        const context = canvas.getContext('2d');
        const getColor = (x, y, r, g, b) => {
            context.fillStyle = `rgb(${r}, ${g}, ${b})`;
            context.fillRect(x, y, 1, 1);
        }
        const red = (x, y, t) => {
            return (Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t)));
        }
        const green = (x, y, t) => {
            return (Math.floor(192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)));
        }
        const blue = (x, y, t) => {
            return (Math.floor(192 + 64 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)));
        }
        let run = () => {
            for (let x = 0; x <= 35; x++) {
                for (let y = 0; y <= 35; y++) {
                    getColor(x, y, red(x, y, time), green(x, y, time), blue(x, y, time));
                }
            }
            time += 0.05;
            window.requestAnimationFrame(run);
        }
        run();

        // Fetch our release version
        (async () => {
            version = await getReleaseVersion($releaseEndpoint);
        })();
    });
</script>

<template>
    <PageSection id="hero-section">
            <Navbar selectedItem={0} items={[
                {
                    name: 'Home',
                    href: '/'
                },
                {
                    name: 'Docs',
                    href: '/',
                    external: true
                },
                {
                    name: 'Discord',
                    href: '/',
                    external: true
                },
                {
                    name: 'GitHub',
                    href: '/',
                    external: true
                }
            ]}/>
            <Flex id="hero-inner-container" align="center" gap>
                <Flex direction="column" id="hero-left-container">
                    <Title>Files</Title>
                    <Subtext>A modern file explorer that pushes the boundaries of the platform.</Subtext>
                    <Flex id="hero-button-container" gap wrap>
                        <Button type="primary" href={`ms-windows-store://pdp/?ProductId=${$storeId}`} custom>
                            <Flex gap align="center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
                                    <path d="M12.25 38.5H35.75C36.7165 38.5 37.5 39.2835 37.5 40.25C37.5 41.1682 36.7929 41.9212 35.8935 41.9942L35.75 42H12.25C11.2835 42 10.5 41.2165 10.5 40.25C10.5 39.3318 11.2071 38.5788 12.1065 38.5058L12.25 38.5H35.75H12.25ZM23.6065 6.2558L23.75 6.25C24.6682 6.25 25.4212 6.95711 25.4942 7.85647L25.5 8V29.333L30.2931 24.5407C30.9765 23.8573 32.0846 23.8573 32.768 24.5407C33.4514 25.2242 33.4514 26.3322 32.768 27.0156L24.9898 34.7938C24.3064 35.4772 23.1984 35.4772 22.515 34.7938L14.7368 27.0156C14.0534 26.3322 14.0534 25.2242 14.7368 24.5407C15.4202 23.8573 16.5282 23.8573 17.2117 24.5407L22 29.329V8C22 7.08183 22.7071 6.32881 23.6065 6.2558L23.75 6.25L23.6065 6.2558Z" fill="currentColor"/>
                                </svg>
                                <Flex direction="column">
                                    <span class="button-title">Download {version}</span>
                                    <span class="button-description">Microsoft Store</span>
                                </Flex>
                            </Flex>
                        </Button>
                        <Button href={$githubUrl} target="_blank" custom>
                            <Flex gap align="center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18">
                                    <path fill-rule="evenodd" fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                </svg>
                                <Flex direction="column">
                                    <span class="button-title">GitHub</span>
                                    <span class="button-description">Files is open source!</span>
                                </Flex>
                            </Flex>
                        </Button>
                    </Flex>
                </Flex>
                <div class="acrylic-material app-preview">
                    <Flex id="app-preview-splitview">
                        <aside>
                            <Flex align="center" id="app-preview-sidebar-header">
                                <button class="sidebar-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M2.75254 17.9997H21.2525C21.6667 17.9997 22.0025 18.3355 22.0025 18.7497C22.0025 19.1294 21.7204 19.4432 21.3543 19.4928L21.2525 19.4997H2.75254C2.33832 19.4997 2.00254 19.1639 2.00254 18.7497C2.00254 18.37 2.28469 18.0562 2.65077 18.0065L2.75254 17.9997H21.2525H2.75254ZM2.75254 11.5027H21.2525C21.6667 11.5027 22.0025 11.8385 22.0025 12.2527C22.0025 12.6324 21.7204 12.9462 21.3543 12.9959L21.2525 13.0027H2.75254C2.33832 13.0027 2.00254 12.6669 2.00254 12.2527C2.00254 11.873 2.28469 11.5592 2.65077 11.5095L2.75254 11.5027H21.2525H2.75254ZM2.75168 5.00293H21.2517C21.6659 5.00293 22.0017 5.33872 22.0017 5.75293C22.0017 6.13263 21.7195 6.44642 21.3535 6.49608L21.2517 6.50293H2.75168C2.33746 6.50293 2.00168 6.16714 2.00168 5.75293C2.00168 5.37323 2.28383 5.05944 2.64991 5.00978L2.75168 5.00293H21.2517H2.75168Z" fill="currentColor"/>
                                    </svg>
                                </button>
                                <h5>Files</h5>
                            </Flex>
                            <ul>
                                <li class="selected">test</li>
                                <li>test</li>
                                <li>test</li>
                            </ul>
                        </aside>
                        <main>
                            <header>
                                <nav>
                                    <div class="tab selected">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <path d="M5.25 3C3.45507 3 2 4.45507 2 6.25V21.75C2 23.5449 3.45507 25 5.25 25H12.01V27.0013L9.01196 27.0013C8.45967 27.0013 8.01196 27.4488 8.01196 28.0007C8.01197 28.5526 8.45969 29 9.01197 29L23.0043 28.9999C23.5565 28.9999 24.0042 28.5525 24.0042 28.0005C24.0042 27.4486 23.5565 27.0012 23.0042 27.0012L20.0059 27.0012V25H26.75C28.5449 25 30 23.5449 30 21.75V6.25C30 4.45507 28.5449 3 26.75 3H5.25ZM18.0059 25V27.0013L14.01 27.0013V25H18.0059ZM4 6.25C4 5.55964 4.55964 5 5.25 5H26.75C27.4404 5 28 5.55964 28 6.25V21.75C28 22.4404 27.4404 23 26.75 23H5.25C4.55964 23 4 22.4404 4 21.75V6.25Z" fill="currentColor"/>
                                        </svg>
                                        Desktop
                                    </div>
                                    <div class="tab">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7 12C7.55228 12 8 11.5523 8 11C8 10.4477 7.55228 10 7 10C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12Z M11 11C11 11.5523 10.5523 12 10 12C9.44772 12 9 11.5523 9 11C9 10.4477 9.44772 10 10 10C10.5523 10 11 10.4477 11 11Z M13 12C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10C12.4477 10 12 10.4477 12 11C12 11.5523 12.4477 12 13 12Z M3 5.5C3 4.11929 4.11929 3 5.5 3H14.5C15.8807 3 17 4.11929 17 5.5V14.5C17 15.8807 15.8807 17 14.5 17H5.5C4.11929 17 3 15.8807 3 14.5V5.5ZM5.5 4C4.67157 4 4 4.67157 4 5.5V14.5C4 15.3284 4.67157 16 5.5 16H14.5C15.3284 16 16 15.3284 16 14.5V7H9.5C8.67157 7 8 6.32843 8 5.5V4H5.5ZM16 5.5C16 4.67157 15.3284 4 14.5 4H9V5.5C9 5.77614 9.22386 6 9.5 6H16V5.5Z" fill="currentColor"/>
                                        </svg>
                                        New Tab
                                    </div>
                                    <button>
                                        
                                    </button>
                                </nav>
                            </header>
                        </main>
                    </Flex>
                </div>
                <canvas width="32" height="32" bind:this={canvas} id="background-canvas"/>
            </Flex>
    </PageSection>
</template>

<style lang="scss">
    .app-preview {
        user-select: none;
        * {
            font-family: 'Segoe UI', sans-serif;
        }
        :global {
            #app-preview-splitview {
                height: 100%;
                zoom: 80%;
            }
            aside {
                flex: 0 0 auto;
                width: 250px;
                #app-preview-sidebar-header {
                    padding: 8px;
                }
                .sidebar-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 45px;
                    width: 50px;
                    border: none;
                    background: none;
                    border-radius: 4px;
                    margin-right: 8px;
                    svg {
                        transition: transform 150ms ease;
                    }
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.03);
                        svg {
                            transform: scaleX(0.85);
                        }
                    }
                    &:active {
                        background-color: rgba(0, 0, 0, 0.02);
                        color: #5d5d5d;
                        svg {
                            transform: scaleX(0.65);
                        }
                    }
                }
                ul {
                    margin: 0;
                    padding: 8px;
                    li {
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 40px;
                        width: 100%;
                        border-radius: 4px;
                        padding: 0 14px;
                        margin-bottom: 4px;
                        color: #5d5d5d;
                        font-weight: 400;
                        &:hover {
                            background-color: rgba(0, 0, 0, 0.03);
                        }
                        &:active {
                            background-color: rgba(0, 0, 0, 0.02);
                        }
                        &:active,
                        &.selected {
                            color: #000;
                        }
                        &.selected::before {
                            content: '';
                            position: absolute;
                            left: 0;
                            width: 3px;
                            height: 20px;
                            border-radius: 8px;
                            background-color: var(--accent);
                        }
                    }
                }
                h5 {
                    margin: 0;
                    line-height: normal;
                    font-size: 16px;
                    font-weight: 600;
                    color: #000;
                }
            }
        }
        main {
            flex: 1 1 auto;
            background-color: #f3f3f3;
            height: 100%;
            box-shadow: 0 0 18px rgba(0, 0, 0, 0.085);
            overflow: hidden;
            header {
                background-color: #eeeeee;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.085);
                nav {
                    padding: 12px;
                    padding-top: 10px;
                    padding-bottom: 4px;
                    display: flex;
                    align-items: center;
                }
                .tab {
                    position: relative;
                    display: flex;
                    align-items: center;
                    padding: 0 12px;
                    font-size: 12px;
                    height: 36px;
                    width: 240px;
                    margin-right: 10px;
                    border-radius: 5px;
                    color: #000;
                    svg {
                        width: 18px;
                        height: 18px;
                        margin-right: 10px;
                    }
                    &::after {
                        content: '';
                        position: absolute;
                        right: 0;
                        height: 30px;
                        border-left: 1px solid rgba(0, 0, 0, 0.25);
                    }
                    &:hover {
                        background-color: #f9f9f9;
                    }
                    &:active,
                    &.selected {
                        background-color: #f9f9f9;
                        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.059), inset 0 -1px 0 rgba(0, 0, 0, 0.102); 
                    }
                    &:hover, &:active, &.selected {
                        &::after {
                            content: none;
                        }
                    }
                    &.selected {
                        font-weight: 500;
                    }
                }
            }
        }
    }
    :global {
        #hero-section {
            z-index: 1;
            height: 100vh;
            min-height: 724px;
            max-height: 1000px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
            padding: 64px 72px;
            background: var(--background-primary);
        }
        #hero-inner-container .button {
            padding: 0 12px;
            height: 45px;
            min-width: 150px;
            justify-content: flex-start;
            text-align: left;
            line-height: 1.4;
            .button-title {
                font-size: 12px;
                font-weight: 600;
            }
            .button-description {
                font-size: 10px;
                font-weight: 400;
            }
        }
        #hero-inner-container,
        #hero-left-container {
            flex: 1 1 auto;
        }
        #hero-button-container {
            margin-top: 24px;
        }
    }

    .app-preview {
        position: relative;
        right: -72px;
        width: auto;
        height: 70vh;
        max-height: 600px;
        aspect-ratio: 34 / 27;
        border-radius: 4px;
        box-shadow: 0 2.74416px 2.74416px rgb(0 0 0 / 3%),
                    0 5.48831px 5.48831px rgb(0 0 0 / 4%),
                    0 13.7208px 10.9766px rgb(0 0 0 / 5%),
                    0 20.5812px 20.5812px rgb(0 0 0 / 6%),
                    0 41.1623px 41.1623px rgb(0 0 0 / 7%),
                    0 96.0454px 89.1851px rgb(0 0 0 / 9%);
    }

    #background-canvas {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vh;
        mask: radial-gradient(at bottom right, #000, transparent 70%);
        z-index: -1;
        pointer-events: none;
    }

    :global(.theme-dark #background-canvas) {
        opacity: 0.5;
    }

    :global {
        .acrylic-material {
            backdrop-filter: blur(60px) saturate(5);
            overflow: hidden;
        }

        .acrylic-material::before {
            content: '';
            z-index: -1;
            background-blend-mode: normal, color, luminosity;
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0.8;
        }

        .acrylic-material::before {
            background: var(--acrylic-layer);
        }
    }
</style>