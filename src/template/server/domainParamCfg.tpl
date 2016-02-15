<br/>
<div class = "row">
	<div class = "col-sm-12" id = "alertInfoRegion"></div>
</div>
<div class = "row">
	<div class = "col-sm-1"></div>
	<div class = "col-sm-11">
		<div class = "row">
			<div class ="col-sm-2">
				<label  class="control-label">负载均衡配置</label>
			</div>
		</div>
		
		<div class = "row">
			<div class = "col-sm-3"><input type="checkbox" id = "qhcheckbox" checked = "checked" />亲和</div>
			<div class ="col-sm-1"></div>
			<div class = "col-sm-4"><input type="checkbox" id = "fqhcheckbox" checked = "checked" />非亲和</div>
		</div>
		<br/>
		<div class = "row">
			<div class = "col-sm-3">
				&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="radio"   name = "affinityAlgorithm"   <%if(affinityAlgorithm==""||affinityAlgorithm=='CONSISTENTHASH'){%>checked='checked'<%}%>  value = "CONSISTENTHASH"/> 一致性哈希
			</div>
			<div class ="col-sm-1"></div>
			<div class = "col-sm-4">
				&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="radio"    name = "statelessAlgorithm" <%if(statelessAlgorithm=='WEIGHTEDROUNDROBIN'){%>checked='checked'<%}%>  value = "WEIGHTEDROUNDROBIN"/> 比例因子
				<input type="radio"    name = "statelessAlgorithm" <%if(statelessAlgorithm==""||statelessAlgorithm=='LEASTPENDINGREQUESTS'){%>checked='checked'<%}%> value = "LEASTPENDINGREQUESTS"/> 最小交易未完成数
			</div>
		</div>
			
	</div>
</div>

<br/>
<div class="form-group">
  <div class="col-sm-offset-1 col-sm-1">
     <button type="button" id = "saveBtn" class="btn btn-primary">保存</button>
  </div>
</div>
	

	




	

	



	






