<template>
  <div class="setting">
    <header>
      <img src="../../static/img/leftx.png" @click="LinkRouter('/?i=2')" alt />
      &nbsp;&nbsp;&nbsp;平台介绍
    </header>
    <div class="line"></div>
    <p>
      海螺直播隶属于安徽星之坊文化传媒有限公司，官方唯一公众号“星之坊文化”，官方唯一400电话400-8386628，为保障海螺直播的基本秩序，创造良好的直播环境，促进海螺直播的健康发展，请遵守【直播文明公约】</br>
      一、海螺直播平台为了维护良好的秩序以及直播环境，特制定本文明公约。</br>
      二、本公约条款适用于海螺直播的所有主播以及用户，适用于所有本平台直播形式。</br>
      三、严禁通过海螺直播对涉及政治、军事、经济、社会、文化、休育等新闻、活动、事件的实况进行音视频直播。</br>
      四、严禁在海螺直播开办涉及政治、军事、经济、社会、文化、体育、访谈评论等类视听节目及直播频道。</br>
      五、严禁在海螺直播使用“电视台”、“广播电台”、“电台”、“TV”等广播电视专有名词开展直播。</br>
      六、严禁在海螺直播发表反党、反政府、反社会的言论或做出侮辱、诋毁党和国家的行为。</br>
      七、严禁在海螺直播传播淫秽、色情信息或进行淫秽、色情表演等行为。</br>
      八、严禁在海螺直播从事低俗、引诱、挑逗性内容、暴露着装、性暗示等行为。</br>
      九、严禁在海螺直播传播、展示、转让、毒品、枪支弹药、管制刀具等违法、违禁品。</br>
      十、严禁在海螺直播传播、宣扬赌博以及宗教迷信涉及算命、占卜等内容。</br>
      十一、严禁在海螺直播发表宣扬暴力、血腥以及恶意谩骂、侮辱、侵犯他人合法权益等内容。</br>
      十二、严禁军人、警察以及国家其它公职人员身着制服在海螺直播直播。</br>
      十三、严禁未成年人在海螺直播直播。</br>
      十四、严禁在海螺直播利用人体缺陷或者以展示人体变异等方式作为直播内容。</br>
      十五、严禁在海螺直播直播睡觉、挂机、黑屏、画面定格等内容。</br>
      十六、严禁在直播理直播未经授权的电影、电视、游戏等内容。</br>
      十七、严禁在海螺直播直播或采集非本平台的直播内容。</br>
      十八、严禁在海螺直播从事广告发布、商业宣传推广、推销商品或其它以获取商业利益为目的的行为。</br>
      十九、严禁在海螺直播以任何方式篡改或以不正当方式误导系统获取用户的地理位置、用户隐私信息的行为。</br>
      二十、严禁在海螺直播通过非官方渠道购买、转卖钻石、礼物等海螺直播的产品或服务。</br>
      二十一、存在以上严禁行为的海螺直播有权视情节轻重，相应的给予禁言、删除信息、警告、停播等方式处理，以及处以1小时、12小时、1天、3天、15天、30天或永久封号等处理措施。</br>
      二十二、已被封号的帐户，其所参与的任何行为均属无效。</br>
      二十三、严禁在海螺直播的用户可以使用“举报”功能对违规的主播、用户进行举报。海螺直播核实后会立即对违规行为进行查处。如发现用户的举报是恶意行为，海螺直播也将进行相应的处罚处理。</br>
      二十四、海螺直播受理举报不收取押金、咨讯费或服务费等任何名目的费用，如遇收费均欺诈。</br>
      二十五、主播不得欺诈、误导、诱导用户充值消费。不得以非法占有为目的或某些特定条件为前提的引导欺诈用户钱财的行为。对平台造成实质上、名誉上损失的追偿赔偿责任，对任何违法犯罪活动一律提交公安机关，
      让我们携手共同打造绿色、健康、文明、积极向上的直播环境
      ，条例解释权归海螺直播直播所有。
    </p>
  </div>
</template>

<script>
import store from "@/store/store";
import api from "@/constant/api";
import { Toast, MessageBox } from "mint-ui";
export default {
  name: "setting",
  data() {
    return {};
  },
  methods: {
    styleObj(o) {
      return 'background:url("' + o + '") center no-repeat;';
    },
    LinkRouter(o) {
      var bu = this.$route.query.t;
      if (bu == 1) {
        var url = "/?i=1";
      } else {
        var url = o;
      }
      this.$router.push({
        path: url
      });
    }
  }
};
</script>

<style scoped lang="less">
.setting {
  header {
    width: 7.1rem;
    margin: 0 auto;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0.4rem;
    img {
      width: 0.26rem;
      vertical-align: middle;
    }
    i {
      font-size: 0.4rem;
      color: #2c2c2c;
      margin-left: 0.5rem;
    }
  }
  .line {
    width: 100%;
    border-top: 0.2rem solid #f3f3f3;
  }
  p{
      padding: 0.1rem 0.3rem;
      font-size: 0.3rem;
      color:#525252;
      text-indent: 0.4rem;
      line-height: 0.55rem;
  }
}

</style>
