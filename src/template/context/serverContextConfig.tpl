<div id="serverContextConfig">
	<div class="line">
		<div class="content">
			<label>超时时间：</label>
		</div>
		<div class="value">
			<input id="optime" name="optime" class="length form-control" type="text" placeholder="必填项： 建议：600 单位：（毫秒）" value="<%=optime%>">
		</div>
		<div class="warn">
			<span class="text-danger">*</span><span>(单位:毫秒)&nbsp;</span>
			<span id="optimeTip" class="text-danger"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>失效时间： </label>
		</div>
		<div class="value">
			<input id="exptime" name="exptime" class="length form-control" type="text" placeholder="必填项：范围：0~10000 单位：（秒）" value="<%=exptime%>">
	  	</div>
	  	<div class="warn">
			<span class="text-danger">*</span><span>(单位:秒)&nbsp;</span>
			<span id="exptimeTip" class="text-danger"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>服务器地址：</label>
		</div>
		<div class="value">
			<input id="servers"  name="servers" class="length form-control" type="text" placeholder="必填项：格式IP:PORT IP:PORT" value="<%=servers%>">
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="serversTip" class="text-danger"></span>
		</div>
	</div>
	<div>
		<div class="col-sm-offset-0">
			<button id="contextSave" class="btn btn-primary" type="button">保存</button>
		</div>
	</div>
</div>