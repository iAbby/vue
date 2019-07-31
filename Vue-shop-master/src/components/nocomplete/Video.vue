<template>
    <div class="videocbl">
        <div class="video-item">
            <div class="video">
                <div class="video-tit">绝对的国漫经典！1979版《哪吒闹海》，哪吒自刎这一段看哭多少人</div>
                <div class="info">
                    <div class="play-click">7200次播放</div>
                    <div class="video-time">6:20</div>
                </div>
                <div class="ic">
                    <a href="javascript:;" class="switch fa fa-play fa-2x" @click="play(0)"></a>
                </div>
                <video id="video1" width="420" >
                    <source src="../../images/mov_bbb.mp4" type="video/mp4">
                    <!-- <source src="../../images/mov_bbb.ogg" type="video/ogg"> -->
                    您的浏览器不支持 HTML5 video 标签。
                </video>
            </div>
            
            <div class="item-bar">
                <div class="vider-author"><span>😀</span> 神奇涛涛</div>
                <div class="bar-r">
                    <a href="javascript:;" class="fa fa-commenting-o"></a> 442 <a href="javascript:;" class="fa fa-ellipsis-h"></a>
                </div>
            </div>
        </div>

        <div class="video-item">
            <div class="video">
                <div class="video-tit">绝对的国漫经典！1979版《哪吒闹海》，哪吒自刎这一段看哭多少人</div>
                <div class="info">
                    <div class="play-click">7200次播放</div>
                    <div class="video-time">6:20</div>
                </div>
                <div class="ic">
                    <a href="javascript:;" class="switch fa fa-play fa-2x" @click="play(1)"></a>
                </div>
                <video id="video1" width="420" >
                    <source src="../../images/mov_bbb.mp4" type="video/mp4">
                    <!-- <source src="../../images/mov_bbb.ogg" type="video/ogg"> -->
                    您的浏览器不支持 HTML5 video 标签。
                </video>
            </div>
            
            <div class="item-bar">
                <div class="vider-author"><span>😀</span> 神奇涛涛</div>
                <div class="bar-r">
                    <a href="javascript:;" class="fa fa-commenting-o"></a> 442 <a href="javascript:;" class="fa fa-ellipsis-h"></a>
                </div>
            </div>
        </div>

        <div class="video-item">
            <div class="video">
                <div class="video-tit">绝对的国漫经典！1979版《哪吒闹海》，哪吒自刎这一段看哭多少人</div>
                <div class="info">
                    <div class="play-click">7200次播放</div>
                    <div class="video-time">6:20</div>
                </div>
                <div class="ic">
                    <a href="javascript:;" class="switch fa fa-play fa-2x" @click="play(2)"></a>
                </div>
                <video id="video1" width="420" >
                    <source src="../../images/mov_bbb.mp4" type="video/mp4">
                    <!-- <source src="../../images/mov_bbb.ogg" type="video/ogg"> -->
                    您的浏览器不支持 HTML5 video 标签。
                </video>
            </div>
            
            <div class="item-bar">
                <div class="vider-author"><span>😀</span> 神奇涛涛</div>
                <div class="bar-r">
                    <a href="javascript:;" class="fa fa-commenting-o"></a> 442 <a href="javascript:;" class="fa fa-ellipsis-h"></a>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    methods: {
        play(i) {
            // 播放按钮  当点击中间的播放按钮后，详情和按钮都隐藏，解开自带的控制条
            const video = document.getElementsByTagName('video')[i];
            if(video.paused){
                video.play();
                /*隐藏信息*/
                document.getElementsByClassName('ic')[i].style.display="none";
                document.getElementsByClassName('video-tit')[i].style.display="none";
                document.getElementsByClassName('info')[i].style.display="none";
                video.setAttribute("controls","controls");               
            }
            else{
                video.pause();
            }
        }
    }
}
</script>
    
    <style scoped>
    * {
		margin: 0;
		padding: 0;
    }
    a {
        text-decoration: none;
    }
    .videocbl {
        background-color:#eee;
    }
	.video-item {
        /*width: 320px;*/
        position: relative;
		width: 100%;
		height: 250px;
        margin-bottom: 5px;
	}
	.video {
		position: relative;
		/*width: 320px;*/
		width: 100%;
		height: 210px;
		overflow: hidden;
	}
	.video .video-tit {
		position: absolute;
		top:0;
		left: 0;
		z-index: 2;
		color: #fff;
        padding: 5px 10px 5px 10px;
        font-size: 14px;
	}
	.video video {
		position: absolute;
		top:0;
		left: 0;
		width: 100%;
        height: 210px;
    }
    .video .info {
        width: 100%;
        position: absolute;
		bottom: 10px;
        left: 10px;
        z-index: 2;
    }
	.video .play-click {
        float: left;
		color: #fff;
        font-size: 12px;
		z-index: 2;
	}
	.video .video-time {
		color: #fff;
        font-size: 12px;
        float: right;
        margin-right: 20px; 
        z-index: 2;      
	}
	.item-bar{
		/*width: 320px;*/
		width: 100%;
		height: 40px;
		background-color: #fff;
	}
    .vider-author {
        float: left;
        line-height: 40px;
        margin-left: 15px;
        font-size: 14px;
    }
    .ic {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #ccc;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 2;
    }
    .ic a {
        /* text-align: center;
        line-height: 70px; */
        position: absolute;
        top: 50%;
        left: 55%;
        transform: translate(-50%,-50%);
    }
    .bar-r {
        float: right;
        line-height: 40px;
        margin-right: 15px;
        font-size: 14px;
    }
    .bar-r a {
        margin: 0 5px;
    }
    </style>